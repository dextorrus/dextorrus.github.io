var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');



//Изображения 
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeNorth.png";
pipeDown.src = "img/pipeSouth.png";

//звук
var fly = new Audio();
var scoreAudio = new Audio();
var crash0 = new Audio();
var crash1 = new Audio();
var score5 = new Audio();
var score10 = new Audio();

fly.src = "audio/fly.wav";
scoreAudio.src = "audio/score.wav";
crash0.src = "audio/crash.wav";
crash1.src = "audio/crach1.wav";
score5.src = "audio/score5.wav";
score10.src = "audio/score10.wav";
//Масив из падений
var crash =[
crash0,
crash1
];
//переменная для масcива падений
var r = Math.floor(Math.random()*(crash.length - 0) + 0);

//Изображения расстояние между трубами
var gap = 150;
//при нажатии на пкм
document.addEventListener("click",moveUp );
document.addEventListener("targetTouches",moveUp );

//Полет лехи
function moveUp() {
	yPos -=50;
	fly.play();
}

//создание трубы
var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}

var score = 0;

//позиция лехи
var xPos = 10;
var yPos = 250;
var grav = 3;
 

function draw() {
	ctx.drawImage(bg, 0, 0);



	for (var i = 0; i < pipe.length; i++) {
	ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
	ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);
	

	pipe[i].x--;
	if (pipe[i].x == 125) {
		pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
		});
	}


		if (xPos + bird.width >= pipe[i].x
	 && xPos <= pipe[i].x + pipeUp.width
	 && (yPos <= pipe[i].y + pipeUp.height
	 	|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
	 	|| yPos + bird.height >= cvs.height - fg.height) {
		document.removeEventListener("click",moveUp );
	 	crash[r].play();setTimeout(rel, 1800);

       var loc = 0;

	 if (loc < score) {
	 	localStorage.setItem('maxScore', score);
	 	loc=score;
	 }

	 clearAnimationFrame(draw);
	}



	if (pipe[i].x == 5) {
		score++;
		scoreAudio.play();
	}

	}
	
    loc = (localStorage.getItem('maxScore'));
    
	ctx.drawImage(fg, 0, cvs.height - fg.height );
	ctx.drawImage(bird, xPos, yPos );

	yPos += grav;

	ctx.fillStyle ="#fff";
	ctx.font = "15px Verdana";
	ctx.fillText("Score: " + score, 10, cvs.height - 20);
	ctx.fillText("Max score: " + loc, cvs.width- 150, cvs.height - 20);



	switch (score) {
		case 5:
			score5.play();
			break;
		case 10:
			score10.play();
			break;
	}
	requestAnimationFrame(draw);



}

function rel() {
	window.location.reload();

}

pipeDown.onload = draw;

if (device.mobile()) {
	cvs.classList.add('mvers');
	document.getElementById("btn").style.display = 'block';
}
