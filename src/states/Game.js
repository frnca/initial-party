/* globals __DEV__ */
import Phaser from 'phaser'
import Tile from '../sprites/Tile'


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
  
    // basic config - just for testing - not used at the mement
    this.config = new Array (
      [1,0,2,1,0,1,0,1,2], 
      [1,0,1,0,0,1,1,2,0], 
      [1,1,0,1,2,0,1,1,1]
    );

    this.addRandomFruit = function(gridX, gridY) {
       
      let fruit = new Tile({
        state: this,
        game: this.game,
        
        x: 50 + gridX*80,
        y: -50,
        // now randomized
        //     asset: fruits.get(this.game.config[i][j]),
        asset: fruits.get(this.game.rnd.between(0, 2)),
       
        gridPositionX: gridX,
        gridPositionY: gridY,
        gridName: "id:" + gridX + "-" + gridY
      }
      )
           
      this.game.add.existing(fruit);
                      
      //enabla physics na novemu objektu
      game.physics.arcade.enable(fruit);

      fruit.game.add.tween(fruit.body).to({ y: 50 + gridY*100  }, 300, Phaser.Easing.Linear.None, true);

    }



    // spite dictionary
    let fruits = new Map();
    fruits.set(0, 'mushroom');
    fruits.set(1, 'apple');
    fruits.set(2, 'pizza');
    
    

    // draw sprites 2D array  
    for (let i = 0; i < this.config.length; i++) {
      for (let j = 0; j < this.config[i].length; j++) {
        
        // add new sprite
        this.addRandomFruit(j, i);
      }
    }
        
  }


  render () {

  }


}



