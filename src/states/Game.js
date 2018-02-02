/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
  
    // textov ne rabimo
    /*
    const bannerText = 'Phaser + ES6 + Webpack'
    
     
      let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })
      

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)
    */


    // inicializira igro za premike - za animacijo premika objekta ne rabimo 
    // game.physics.startSystem(Phaser.Physics.ARCADE);



    // doda nekaj spritov gor 
    //
    // nisem nasel kako dodati relativne koordinate glede na width oz. height objekta

    for (let i = 0; i < 5; i++) {
      this.mushroom = new Mushroom({
        game: this.game,
        x: 50 + i*100,                 
        y: 50,
        asset: 'mushroom',
      }
    )
  
      this.game.add.existing(this.mushroom);

      //enabla physics na novemu objektu
      game.physics.arcade.enable(this.mushroom);

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
