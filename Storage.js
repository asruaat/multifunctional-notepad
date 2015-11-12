//main div kiválasztása a html dok.ból
document.querySelector("div[role='main']").style.height = "" + (screen.height - 74) + "px";

//létrehoz megfelelő mennyiségű pre tagú objectet, hozzáfűzi őket a txts idjú objecthez
//beleírja az üres string + szoveg -et melyet megkap
function addsor (szoveg) {
	  var li = document.createElement("pre");
	  li.innerHTML = "" + szoveg;
	  document.getElementById("txts").appendChild(li);
	

}
//indexedDB létrehozása és megnyitása (Adatbazis_Tar néven)
var IDBFactory_db = window.indexedDB;
var IDBOpenDBRequest_req = IDBFactory_db.open ("Adatbazis_Tar", 1);

//frissítés esetén eseménykezelő
IDBOpenDBRequest_req.onupgradeneeded = function (evt) {
	//hozzászólásoknak és a hozzájuk kapcsolódó autoinc. id-knak a létrehozása
    var IDBDatabase_db = evt.currentTarget.result;
    
    var IDBObjectStore_os = IDBDatabase_db.createObjectStore ("Hozzaszolasok", {keyPath: "Id", autoIncrement: true});
    //egyedi azonosító -> true (id)
    var IDBIndex_idx1 = IDBObjectStore_os.createIndex ("Id", "Id", {unique: true});
    
};

//eseménykezelő sikeres lefutás esetén
IDBOpenDBRequest_req.onsuccess = function () {
  var IDBDatabase_db = this.result;
  //tranzakció indítás meg kilistázza a Hozzaszolasok nevú objektumok az adatbázisból, csak olvasásra
  var IDBTransaction_trans = IDBDatabase_db.transaction ("Hozzaszolasok", "readonly");
    //sikeres futás esetén eseménykezelő, mely lezárja az adatbázis kapcsolatot
  IDBTransaction_trans.oncomplete = function () {
      IDBDatabase_db.close ();
  };
  //Hozzaszolasok obj. elővétele majd bejárása kurzorral
  var IDBObjectStore_oswt = IDBTransaction_trans.objectStore ("Hozzaszolasok");
  //kurzus nyitás a hozzaszolasok bejárásához (sorról-sorra halad az adatbázisban (indexedDB))
  var IDBRequest_Kreq1 = IDBObjectStore_oswt.openCursor ();
  IDBRequest_Kreq1.onsuccess = function (evt) {
    var IDBCursorWithValue_cursor = evt.target.result;
    //hozzászólások kivétele az adatbázisból a kurzor segítségével
	//az addsor fgv (fentebb definiált) soronként megkapja ezt az értéket
	//a kurzor sorról-sorra haladva lépked
    if (IDBCursorWithValue_cursor) {
      addsor ("" + IDBCursorWithValue_cursor.value.Id + ".) " + IDBCursorWithValue_cursor.value.Szoveg);
      IDBCursorWithValue_cursor.continue ();
    }
    //konzolra logolás
    else {
      console.log ("Véget ért a kiírás!");
    }
    
  };
  //kurzus hiba
  IDBRequest_Kreq1.onerror = function () {
   console.log ("Hiba a kurzor megnyitásakor!");
  };
  
};

//új hozzászólás felvitele
function addTxt() {
	//ha üres a txt (beviteli mező) akkor alert 
if(document.getElementById("txt").value == ""){
    window.alert("Please fill the field then press Add button!");
}else{
  var IDBFactory_db = window.indexedDB;
  //adatbázis megnyitása (Adatbazis_Tar)
  var IDBOpenDBRequest_req = IDBFactory_db.open ("Adatbazis_Tar", 1);
  //sikeres nyitás esetén...
  IDBOpenDBRequest_req.onsuccess = function () {
    var IDBDatabase_db = this.result;
	//Hozzaszolasok "tabla" vagy objektum megnyitása írás/olvasásra
    var IDBTransaction_trans = IDBDatabase_db.transaction ("Hozzaszolasok", "readwrite");
    //sikeres nyitás esetén
    IDBTransaction_trans.oncomplete = function () {
		//ha üres volt a hozzászólás akkor visszatér majd a főoldalra
		if(document.getElementById("txt").value == ""){
			window.location == "/index.html";
		}else{
			//különben a txt-ben szereplő (inputról érkező) value-t az adatbázisba szúrja
			//és egy alertben megkapjuk hogy sikeresen rögzítve lett a note a listához
			addsor(document.getElementById("txt").value);
			IDBDatabase_db.close ();
			window.alert("Note has been added to your list!");
			//majd az oldalt újratöltjük -> annak érdekében hogy frissüljön a lista rögtön az alert után
			//ez azért szükséges mert egyébként bekerül a listába az elem, csak mivel van neki egy unqiue id-ja
			//melyet a következő kiolvasásnál (azaz az oldal frissítésénél) kap meg így az id nem kerül rögtön kiíratásra
			//ez inkább csak szépségbeli gond, mintsem funkcionális
			location.reload(); 
		}
	};

    var IDBObjectStore_oswt = IDBTransaction_trans.objectStore ("Hozzaszolasok");
    //a Szoveg definiálása -> a txt id-jú mező értéke
    var hozzaszolas = {Szoveg: document.getElementById("txt").value};
    //hozzászólás beszúrása az adatbázisba
    var IDBRequest_req = IDBObjectStore_oswt.add (hozzaszolas);
    IDBRequest_req.onsuccess = function () {
      console.log ("Sikerült a hozzászólás hozzáadása: Hozzászólás szövege: " + hozzaszolas.Szoveg);
    };
    //hiba esetén, ha nem sikerült a hozzászólás rögzítése -> hibakezelő
    IDBRequest_req.onerror = function () {
      console.log ("Hiba történt a hozzászólás létrehozásakor!");
    };
    
    
  };
  //eseménykezelő hiba esetén (adatbázis megnyitás)
  IDBOpenDBRequest_req.onerror = function () {
    console.log ("Hiba történt az Adatbázis megnyitásakor!");
  };
  			
}

}

//click eseménykezelő hozzácsatolása az action id-jú html objecthez
document.getElementById("action").addEventListener("click", addTxt);