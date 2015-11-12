jQuery.fn.verticalMarquee = function(vertSpeed, horiSpeed, index) {
   
    this.css('float', 'left');

    vertSpeed = vertSpeed || 1;
    horiSpeed = 1/horiSpeed || 1;

    var windowH = this.parent().height(),
        thisH = this.height(),
        parentW = (this.parent().width() - this.width()) ,
        rand = Math.random() * (index * 1000),
        current = this;

    this.css('margin-top', windowH + thisH);
    this.parent().css('overflow', 'hidden');

    setInterval(function() {
        current.css({
            marginTop: function(n, v) {
                return parseFloat(v) - vertSpeed;
            },
            marginLeft: function(n, v) {
                return (Math.sin(new Date().getTime() / (horiSpeed * 1000) + rand) + 1) * parentW;
            }
        });
    }, 15);

    setInterval(function() {
        if (parseFloat(current.css('margin-top')) < -thisH) {
            current.css('margin-top', windowH + thisH);
        }
    }, 2500);

};

var message = 1;
$('.message').each(function(message) {  
    $(this).verticalMarquee(1, 1, message);
    message++
});


//egy pontszám változó inicializálása 0-ra
var pontszam = 0;	
//functionok arra, hogy a pontszám id-jú object tartalma a pontszám legyen
function increaseScore(){
	//mess1 idjú object clickelése esetén beleírja a pontszam-ba a pontszámok
	//majd eltűnteti a "div"-et és visszahívja 5 másodperc múlva (lassan)
	if($("mess1").click){
			pontszam++;
			document.getElementById("pontszam").innerHTML= "Score: " + pontszam;
			 $("#mess1").fadeOut();
			 $("#mess1").delay("slow").fadeIn("5000");
	}
}
function increaseScore2(){
	if($("mess2").click){
			pontszam++;
			document.getElementById("pontszam").innerHTML= "Score: " + pontszam;
			 $("#mess2").fadeOut();
			 $("#mess2").delay("slow").fadeIn("5000");
	}
}
function increaseScore3(){
	if($("mess3").click){
			pontszam++;
			document.getElementById("pontszam").innerHTML= "Score: " + pontszam;
			 $("#mess3").fadeOut();
			 $("#mess3").delay("slow").fadeIn("5000");
	}
}
function increaseScore4(){
	if($("mess4").click){
			pontszam++;
			document.getElementById("pontszam").innerHTML= "Score: " + pontszam;
			 $("#mess4").fadeOut();
			 $("#mess4").delay("slow").fadeIn("5000");
	}
}
function increaseScore5(){
	if($("mess3").click){
			pontszam++;
			document.getElementById("pontszam").innerHTML= "Score: " + pontszam;
			 $("#mess5").fadeOut();
			 $("#mess5").delay("slow").fadeIn("5000");
	}
}

 //időzítő
function startTimer(duration, display) {
	//setInterval szükséges hozzá
	//deklaráció
    var timer = duration, minutes, seconds;
    setInterval(function () {
		//percek parse-olása int-té
		//illetve a másodperceké is
		
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
	
		//hátralevő idő kiíratása
        display.textContent = "Remaining time: " + minutes + ":" + seconds;
		//ha lejár az időm akkor a pontszám kiírása alertként, majd index.html-re való redirect
        if (--timer < 0) {
            timer = alert("Your score: " + pontszam);
			window.location = "index.html";
        }
		//időzítő frissítése másodpercenként 1000 millisec
    }, 1000);
}
//onload esetén (mikor betöltődik az oldal és a script), akkor kiíratásra kerül az idő (60 sec az induló)
window.onload = function () {
    var oneMinute = 60,
    display = document.querySelector('#time');
    startTimer(oneMinute, display);
};
