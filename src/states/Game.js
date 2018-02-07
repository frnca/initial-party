/* globals __DEV__ */
import Phaser from 'phaser'
import Tile from '../sprites/Tile'


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
  
    
    // sprites 2D array
    /* old config
    config = [
      [0,0,0,1,0,2,1,2,2],
      [1,2,0,1,2,0,1,1,1]
      ];
    */

    /*this.config = new Array (
      [0,0,0,1,0,2,1,2,2], 
      [1,2,0,1,2,0,1,1,1]
    );
    */

    this.config = new Array (
      [1,0,2,1,0,1,0,1,2], 
      [1,0,0,0,0,1,1,1,0], 
      [1,1,1,1,2,0,1,1,1]
    );


    // spite dictionary
    let fruits = new Map();
    fruits.set(0, 'mushroom');
    fruits.set(1, 'apple');
    fruits.set(2, 'pizza');
    
    //var gameBoard = game.add.group();

    // draw sprites 2D array  
    for (let i = 0; i < this.config.length; i++) {
      for (let j = 0; j < this.config[i].length; j++) {

        this.fruit = new Tile({
          game: this.game,
          x: 50 + j*80,
          y: 50 + i*100,
          asset: fruits.get(this.config[i][j]),
          gridPositionX: j,
          gridPositionY: i,
          gridName: "id:" + j + "-" + i
        }
        )

        this.game.add.existing(this.fruit);
                
        //enabla physics na novemu objektu
        game.physics.arcade.enable(this.fruit);

      }
    }
        
  }



  render () {

  }


}



