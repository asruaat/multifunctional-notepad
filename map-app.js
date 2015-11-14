//dokumentumban megkeressük a #btnLocateMe id-jú gombot és hozzárendeljük clickelés esetén findMyCurrentLocation() functiont
$(document).ready(function(){
		  $("#btnLocateMe").click(function(){
			findMyCurrentLocation();
		  });
});

//megkeresi a telefon/felhasználó helyzetet (GPS alaján)
function findMyCurrentLocation(){
	//új service indítása -> geolocation 
	var geoService = navigator.geolocation;
	if (geoService) {
		//a telefon helyzetének meghatározása, magas pontossággal, (hiba esetén a hibakezelőre ugrás)
		navigator.geolocation.getCurrentPosition(showCurrentLocation,errorHandler,{enableHighAccuracy:true});
	} else {
		alert("Your Browser does not support GeoLocation.");
	}
}
//a seachResult id-jú html objektumban megjeleníti a szélességi és hosszúsági helyzetet (egymás alá írva), illetve konzolra is kiírja
function showCurrentLocation(position){
  $("#searchResults").html("Current Latitude : " + position.coords.latitude + "°" + "\<br> Current Longitude : " + position.coords.longitude + "°");

}
//hibakezelés -> valamilyen hiba lépett fel a pozíció meghatározása során -> pl. nem kapott engedélyt az app a usertől, vagy nem sikerült meghatározni
// a pozíciót (időtúllépés vagy más miatt)
function errorHandler(error){
	  alert("Error while retrieving current position. Error code: " + error.code + ",Message: " + error.message);
}