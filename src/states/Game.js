/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
  
    
    // sprites 2D array
    var config = [
      [0,0,0,1,0,2,1,2,2],
      [1,2,0,1,2,0,1,1,1]
      ];



    // spites dictionary
    let fruits = new Map();
    fruits.set(0, 'mushroom');
    fruits.set(1, 'apple');
    fruits.set(2, 'pizza');
    
    // draw sprites 2D array  
    for (let i = 0; i < config.length; i++) {
      for (let j = 0; j < config[i].length; j++) {
        this.fruit = new Mushroom({
          game: this.game,
          x: 50 + j*80,
          y: 50 + i*100,
          asset: fruits.get(config[i][j]),
          gridPositionX: j,
          gridPositionY: i
        }
        )

        this.game.add.existing(this.fruit);

        //enabla physics na novemu objektu
        game.physics.arcade.enable(this.fruit);

      }
    }

  }



  render () {
    
    // ne rabimo izpisovanja parametrov
    /*
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
    */

  }


}




