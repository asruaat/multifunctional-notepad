window.onload = function() {  
	window.navigator.vibrate(2000);
}
			 
function vissza() {
                window.location.href = "index.html";
}
            
function bezar() {
    var IDBOpenDBRequest_req1 = window.indexedDB.deleteDatabase ("Adatbazis_Tar");
        IDBOpenDBRequest_req1.onsuccess = function () {
				 
			console.log ("Sikerült az adatbázis törlése!");    
    };
              
		IDBOpenDBRequest_req1.onerror = function () {
			console.log ("Hiba az adatbázis törlésekor!");    
        };
              
                window.location.href = "index.html";
        }

document.querySelector("#nem").addEventListener("click", vissza);
document.querySelector("#igen").addEventListener("click", bezar);