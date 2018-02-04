import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, gridPositionX, gridPositionY }) {
    super(game, x, y, asset, gridPositionX, gridPositionY)
    this.anchor.setTo(0.5)
    
    // enabla inpute na objektu
    this.inputEnabled = true;
    
    // config grid position for each object   
    this.gridPositionX = gridPositionX;
    this.gridPositionY = gridPositionY;
  }

  
  update () {
    //this.angle += 1
    
    // on mouse click izvede funkcijo onClick
    this.events.onInputDown.add(onClick, this);
  }

}

function onClick() {

 // izvede animacijo position y, speed  ... absolutne pozicije
 // this.game.add.tween(this.body).to({ y: 300 }, 200, Phaser.Easing.Linear.None, true);

 // find equal neighbours
 checkNeighbours(this);
 
 // do sth with object 
 dropIt(this);

}



function checkNeighbours(objectName) {

  // grid position property
  // alert(objectName.gridPositionX + ":" + objectName.gridPositionY)

}


function dropIt(objectName) {
  // animate object drop
  objectName.game.add.tween(objectName.body).to({ y: 300 }, 200, Phaser.Easing.Linear.None, true);
  
}