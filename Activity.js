//Tárcsázó bekészítése telefonáláshoz
function tel () {	
	//új activity indítása -> dial -> tárcsázó
	//type -> egy number , number -> tárcsázóban előre bekészített számot lehet bevinni
				  var activity = new MozActivity ({
							name: "dial",
							data: {
								type: "webtelephony/number",
								number: "+36"
							}
						});
		
	//eseménykezelő sikeres lefutás esetén logolja	
				activity.onsuccess = function () {
					console.log ("Sikerült a tárcsázás bekészítése!");
				};

	//illetve ha sikertelen akkor is
		activity.onerror = function () {
					console.log ("Sikertelen a tárcsázás bekészítése!");
				};
		
}

function gallery(){
	//új activity indítása -> galéria és camera használathoz
	var pick = new MozActivity({
   name: "pick",
   data: {
	   //képformátumok megadása, melyeket ismerje fel
       type: ["image/png", "image/jpg", "image/jpeg"]
   }
});
//eseménykezelő sikeres lefutás esetén
pick.onsuccess = function () {
	//egy img elementet csinál a documentben majd az elérési utat hozzácsatolja (blob)
    var img = document.createElement("img");
    img.src = window.URL.createObjectURL(this.result.blob);
 
	//megjeleníti a kép(ek)et
    var imagePresenter = document.querySelector("#image-presenter");
    imagePresenter.appendChild(img);
};
 //eseménykezelő hiba esetén -> kiírja az alábbi szöveget (alertben)
pick.onerror = function () {
    alert("Can't view the image!");
};
}

//Telefonkönyv bekészítése telefonáláshoz
function tkonyv () {
	//új activity indítása (szükséges a dial-hez)
	var activity = new MozActivity ({
		name: "pick",
		data: {
			type: "webcontacts/contact"
		}
	});
	//eseménykezelő sikeres lefutás esetén
	activity.onsuccess = function () {
		console.log ("Sikerült a tárcsázás bekészítése!");
	};
	//eseménykezelő sikertelen futás esetén
	activity.onerror = function () {
		console.log ("Sikertelen a tárcsázás bekészítése!");
	};
}

// eseménykezelők hozzácsatolása a html-ben szereplő objektumokhoz
document.getElementById ("tarcsazas").addEventListener ("click", tel);
document.getElementById ("tkonyv").addEventListener ("click", tkonyv);




