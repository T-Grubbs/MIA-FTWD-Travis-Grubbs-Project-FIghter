let theGame;

let keyCommands = [];
var fight = new Audio('fight.mp3');
var newChallenger = new Audio('newChallenger.mp3');
var stageMusic = new Audio('RyuStage.mp3');
var ryuEnding = new Audio('RyuEnding.mp3');
var gameOver = new Audio('gameover.mp3');
var punch = new Audio('PUNCH.mp3');

class Game {
	constructor() {
		this.ctx = document.getElementById('stage').getContext('2d');
		this.player = new Player();
		this.cpu = new Cpu();
		this.energy = 8;
		this.cpuEnergy = 8;
		this.player.move();

		setInterval(() => {
			this.player.move();
			this.drawEverything();
			this.player.collision();
			this.cpu.collision();
		}, 60);
	}

	drawEverything() {
		this.ctx.clearRect(0, 0, 800, 900);
		setTimeout(() => {
			this.cpu.randomMove();
		}, 1000);

		this.player.draw();
		this.cpu.draw();

		for (let k = 0; k < this.energy; k++) {
			let theImage = new Image();
			theImage.src = 'images/Ryu-weak-hadoken.png';

			theImage.onload = () => {
				this.ctx.drawImage(theImage, k * 20, 20, 20, 20);
			};
		}

		for (let kk = 0; kk < this.cpuEnergy; kk++) {
			let theImage = new Image();
			theImage.src = 'images/Ryu-weak-hadoken.png';

			theImage.onload = () => {
				this.ctx.drawImage(theImage, kk * 20, 70, 20, 20);
			};
		}
	}
}

document.getElementById('start-button').onclick = function() {
	setTimeout(() => {
		fight.play();
		stageMusic.play();
		theGame = new Game();
		anotherPlayer = new Player();
		anotherPlayer.draw();
		spawnCpu = new Cpu();
		spawnCpu.draw();
	}, 1000);
};

class Player {
	constructor() {
		this.x = 45;
		this.y = 200;
		this.width = 95;
		this.height = 255;
		this.imgsrc = 'images/Ryu_492.png';
		this.ctx = document.getElementById('stage').getContext('2d');
	}

	draw() {
		if (keyCommands.includes(' ')) {
			this.imgsrc = 'images/Ryu-hadoken-cockback.png';
			this.height = 240;
			keyCommands.push('attack');

			setTimeout(() => {
				this.imgsrc = 'images/Ryu-hadoken.png';
				this.x += 4;
				this.width = 115;
			}, 100);

			setTimeout(() => {
				if (this.x + this.width > theGame.cpu.x) {
					this.x -= 5;
					theGame.cpu.x += 50;
					theGame.cpu.imgsrc = 'images/Evil-Ryu-getting.png';
					theGame.cpuEnergy--;
					punch.play();

					if ((theGame.cpu.imgsrc = 'images/Evil-Ryu-getting.png')) {
						setTimeout(() => {
							theGame.cpu.imgsrc = 'images/Evil-Ryu-cropped.png';
						}, 150);
					}

					if (theGame.cpuEnergy === 0) {
						ryuEnding.play();
						stageMusic.pause();

						setTimeout(() => {
							alert('   SHORYUKEN!!!!!!!');
						}, 500);
					}
				}
			}, 200);

			setTimeout(() => {
				this.imgsrc = 'images/Ryu_492.png';
				this.x -= 1;
				this.width = 85;
			}, 200);
		}

		let theImage = new Image();
		theImage.src = this.imgsrc;
		theImage.onload = () => {
			this.ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
		};
		return this;
	}

	move() {
		this.canMove(this.x, this.y);
		if (keyCommands.includes('ArrowLeft')) {
			if (this.canMove(this.x - 20, this.y)) {
				this.x -= 20;
			}
		}

		if (keyCommands.includes('ArrowRight')) {
			if (this.canMove(this.x + 20, this.y)) {
				this.x += 20;
			}
		}
		//     if (keyCommands.includes("ArrowUp")){
		// if (this.canMove(this.y -130, this.x)){
		//     this.y -=130
		//     setTimeout(()=>{
		//       this.y +=130
		//     }, 500)

		// }
		//     }
	}

	canMove(futureX) {
		let result = true;

		if (futureX < 0 || futureX > 790) {
			result = false;
		}
		return result;
	}
}

class Cpu {
	constructor() {
		this.x = 445;
		this.y = 210;
		this.width = 65;
		this.height = 220;
		this.imgsrc = 'images/Evil-Ryu-cropped.png';
		this.ctx = document.getElementById('stage').getContext('2d');
		this.movesList = [ 'moveLeft', 'moveRight', 'moveLeft', 'attack' ];
	}

	draw() {
		let theImage = new Image();
		theImage.src = this.imgsrc;
		theImage.onload = () => {
			this.ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
		};
		return this;
	}

	move() {
		this.canMove(this.x, this.y);
	}

	canMove(futureX) {
		let result = true;
		if (futureX < theGame.player.x || futureX > 800) {
			result = false;
		}
	}

	collision() {
		if (this.x < theGame.player.x + 75) {
			this.x += 50;
			theGame.player.x -= 50;
		}
	}

	randomMove() {
		let ii = Math.floor(Math.random() * this.movesList.length);
		let random = Math.floor(Math.random() * 11);
		if (random === 2) {
			if (this.movesList[ii] === 'moveRight') {
				this.x += 20;
			}
			if (this.x > 450) {
				this.x - 92;
			}

			if (this.movesList[ii] === 'moveLeft') {
				this.x -= 20;
			}
		}

		if (this.movesList[ii] === 'attack') {
			this.width = 100;
			this.x - 3;
			this.imgsrc = 'images/Evil-Ryu-cockback.png';

			setTimeout(() => {
				this.imgsrc = 'images/Evil-Ryu-punch.png';
				this.width = 100;
			}, 100);

			setTimeout(() => {
				if (this.x - this.width < theGame.player.x) {
					this.x -= 5;
					theGame.player.x -= 50;
					theGame.player.imgsrc = 'images/Ryu-getting-hit.png';
					theGame.energy--;
					punch.play();

					if (theGame.energy === 0) {
						gameOver.play();
						stageMusic.pause();
						alert(
							'             GAME OVER!!!\n              EVIL RYU WINS!!!!!\n         YOU NEED TO WORK ON YOUR HADO \n press ok to train.'
						);
						theGame.drawEverything().newGame();
					}

					if ((theGame.player.imgsrc = 'images/Ryu-getting-hit.png')) {
						setTimeout(() => {
							theGame.player.imgsrc = 'images/Ryu_492.png';
						}, 100);
					}
				}
			}, 200);

			setTimeout(() => {
				this.imgsrc = 'images/Evil-Ryu-cropped.png';
			}, 200);
		}
	}
}

document.onkeydown = function(e) {
	let commands = [ 'ArrowLeft', 'ArrowRight', ' ' ];

	if (commands.includes(e.key)) {
		e.preventDefault();
	}
	if (!keyCommands.includes(e.key)) {
		keyCommands.push(e.key);
	}
};

document.onkeyup = function(e) {
	let theIndex = keyCommands.indexOf(e.key);

	if (theIndex != -1) {
		keyCommands.splice(theIndex, 1);
	}
};
