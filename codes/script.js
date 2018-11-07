let theGame;

let keyCommands = []

class Game {
  constructor() {
    this.ctx = document.getElementById('stage').getContext('2d');
    this.player = new Player()
    this.cpu = new Cpu()
    this.energy = new Energy()
    //this.life = new Life()
    this.player.move()





    setInterval(() => {
      this.ctx.clearRect(0, 0, 600, 750);
      this.player.move();
      this.drawEverything();

    }, 50)
  }

  drawEverything() {
    this.player.draw();
    this.cpu.draw();
    this.cpu.randomMove()
    this.energy.draw()
    for(let k = 0; k <= 20; k++){
        if(k % 2 === 0){

            this.energy.draw().x += 4
            
        }
        
    }
    //this.life.draw()


    
  }
}



document.getElementById("start-button").onclick = function () {
 
  theGame = new Game();
  anotherPlayer = new Player();
  anotherPlayer.draw();
  spawnCpu = new Cpu();
  spawnCpu.draw()

};


class Player {
  constructor() {
    this.x = 45;
    this.y = 200;
    this.width = 85;
    this.height = 255;
    this.imgsrc = 'images/Ryu_492.png'
    this.ctx = document.getElementById('stage').getContext('2d');

  }

  draw() {
      


    if (keyCommands.includes(' ')) {
      this.imgsrc = 'images/Ryu-hadoken-cockback.png'
      this.height = 240;

      keyCommands.push('attack')
      setTimeout(() => {
        this.imgsrc = 'images/Ryu-hadoken.png'
        this.x += 1;
        // this.width +=5;        
      }, 100)
      setTimeout(() => {

        if (this.x + this.width > theGame.cpu.x) {
          this.x -= 5;
          theGame.cpu.x += 50;
          theGame.cpu.imgsrc = 'images/Evil-Ryu-getting.png'
          if(theGame.cpu.imgsrc = 'images/Evil-Ryu-getting.png'){
              setTimeout(()=>{
                  theGame.cpu.imgsrc = 'images/Evil-Ryu-cropped.png'
              }, 150)
          }

          //Method for cpu take damage here 
          console.log('OW')
          //result = false;
        }
      }, 200)
      setTimeout(() => {
        this.imgsrc = 'images/Ryu_492.png'
        this.x -= 1;
        this.width = 85;
      }, 200)


    }


    let theImage = new Image();
    theImage.src = this.imgsrc;
    theImage.onload = () => {
      this.ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
    }
    return this;
  }

  move() {

    this.canMove(this.x, this.y)
    if (keyCommands.includes("ArrowLeft")) {
      if (this.canMove(this.x - 20, this.y)) {
        console.log("SEE ME!?")
        this.x -= 20;
      }
    }

    if (keyCommands.includes("ArrowRight")) {
      if (this.canMove(this.x + 20, this.y)) {
        this.x += 20;
      }
    }
  }

  canMove(futureX, futureY) {
    let result = true;
    if (futureX < 0 || futureX > 590 || futureY < 0 || futureY > 700) {
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
    this.imgsrc = 'images/Evil-Ryu-cropped.png'
    this.ctx = document.getElementById('stage').getContext('2d');

    this.movesList = ["moveRight", "moveLeft", "attack"]

  }


  draw() {
    let theImage = new Image();
    theImage.src = this.imgsrc;
    theImage.onload = () => {
      this.ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
    }
    return this;
  }

  move() {
    this.canMove(this.x, this.y)

  }

  canMove(futureX, futureY) {
    let result = true;
    if (futureX < 0 || futureX > 550) {
      result = false;
    }

    if (futureX > theGame.player.x + theGame.player.width) {
        this.x +50;
        theGame.player.x -50;

      }

  }

  randomMove() {

    let ii = Math.floor(Math.random() * this.movesList.length)
    let random = Math.floor(Math.random() * 11)
    if (random === 2) {

      if (this.movesList[ii] === 'moveRight') {
        this.x += 20;
        console.log('Move Right')
      }
      if (this.movesList[ii] === 'moveLeft') {
        console.log('Move Left')
        this.x -= 20;


        if (this.x  < theGame.player.x + theGame.player.width) {
            this.x + 50;
            theGame.x - 50;
        }

      }


      if (this.movesList[ii] === 'attack') {
        console.log('Attack')
        this.width = 100;
        this.x -3;
        this.imgsrc = 'images/Evil-Ryu-cockback.png';






        setTimeout(() => {
          this.imgsrc = 'images/Evil-Ryu-punch.png'
        }, 150)


        setTimeout(() => {

          if (this.x - this.width < theGame.player.x) {
            this.x -= 5;
            theGame.player.x -= 50;
            theGame.player.imgsrc = 'images/Ryu-getting-hit.png'

           
            if (theGame.player.imgsrc = 'images/Ryu-getting-hit.png') {
              setTimeout(() => {
                theGame.player.imgsrc = 'images/Ryu_492.png'
              }, 100)
            }
            
          }
        }, 200)


        setTimeout(() => {
          this.imgsrc = 'images/Evil-Ryu-cropped.png'
        }, 200)
      }
    }
  }


}



class Energy {
    constructor(){
        this.x = 45;
        this.y = 20;
        this.width = 40;
        this.height = 40;
        this.imgsrc = 'images/Ryu-weak-hadoken.png'
        this.ctx = document.getElementById('stage').getContext('2d')
    }
    
    
 
  

    draw() {
        let theImage = new Image();
        theImage.src = this.imgsrc;
        theImage.onload = () => {
          this.ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
       
 
            
        }
        return this;
      }
}

// class Life extends Energy {
//     super(){
//         this.x = 48;
//         this.y = 20;


//         draw() {
//             let theImage = new Image();
//             theImage.src = this.imgsrc;
//             theImage.onload = () => {
//               this.ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
//             }
//             return this;
//           }
//     }
    
// }


document.onkeydown = function (e) {
  let commands = ['ArrowLeft', 'ArrowRight', ' ']


  if (commands.includes(e.key)) {
    e.preventDefault();
  }
  if (!keyCommands.includes(e.key)) {
    keyCommands.push(e.key);
  }


  // console.log(e.key)
  console.log(keyCommands)

}



document.onkeyup = function (e) {
  let theIndex = keyCommands.indexOf(e.key)
  console.log(theIndex)
  if (theIndex != -1) {
    keyCommands.splice(theIndex, 1)
  }

}



  
  