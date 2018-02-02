import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, name }) {
    super(game, x, y, asset, name)
    this.anchor.setTo(0.5)
    
    // enabla inpute na objektu
    this.inputEnabled = true;
  }

  update () {
    this.angle += 1
    
    // on mouse click izvede funkcijo onClick
    this.events.onInputDown.add(onClick, this);
  }

}

function onClick() {

 // alert("Clickec");
 
 // izvede animacijo postition y, speed  ... absolutne pozicije
 this.game.add.tween(this.body).to({ y: 300 }, 200, Phaser.Easing.Linear.None, true);
}

