import Phaser from 'phaser'
import Game from '../states/Game'

export default class extends Phaser.Sprite {
  constructor ({ state, game, x, y, asset, gridPositionX, gridPositionY, gridName}) {
    super(game, x, y, asset, gridPositionX, gridPositionY, gridName)
    this.anchor.setTo(0.5)
   
    // enabla inpute na objektu
    this.inputEnabled = true;
   
    // config grid position for each object  
    this.gridPositionX = gridPositionX;
    this.gridPositionY = gridPositionY;

    this.asset = asset;


    // ID for testing only
    
    this.gridName = gridName;
    this.state = state;

    // creates drop animation on object
    this.drop = function(){
        var tween = this.game.add.tween(this.body).to({ y: 300}, 300, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this).to({ alpha: 0}, 600, Phaser.Easing.Linear.None, true);
        
        // get fallen object gridpos
        let gridX = this.gridPositionX;
        let gridY = this.gridPositionY;

        // to destroy object after drop animation
        tween.onComplete.add(function(){
            this.destroy();
            }, this);

        // animate add new fruit
        tween.onComplete.add(function(){
            state.addRandomFruit(gridX, gridY);
            }, this);

    }

    // return object according to gridPosition
    this.getObjReference = function(x,y) {
        if (this.gridPositionX == x && this.gridPositionY == y){
            return true;
        } else {
            return false;
        }
    }

    // get all the base object neighbors  
    this.getNeighbors = function(x,y) {
        if (Math.abs(this.gridPositionX - x) + Math.abs(this.gridPositionY - y) == 1 )  {
            return true;
        } else {
          return false;
        }
    }


    // check neighbours for patern asset match
    this.checkNeighbors = function(obj) {

        // base object is the first match
        if (obj.game.world.matched.length == 0) {
          obj.game.world.matched.push(obj);
        };
        
        // find neighbours
        var fruitNeighbors = obj.game.world.children.filter(function(child, index, children) {
          return obj.getNeighbors(child.gridPositionX, child.gridPositionY);
        }, true);


        // check neighbours for matching
        fruitNeighbors.forEach(element => {
          if ((element.asset == obj.asset) && (obj != element) && (obj.game.world.matched.includes(element) != true)) {
            obj.game.world.matched.push(element)
            
            // find new neighbours only 
            element.checkNeighbors(element);

          };
        });
    }


    this.onClick = function() {
        // new empty array
        this.game.world.matched = new Array();

        // start mathing engine
        this.checkNeighbors(this);

        // drop animation on all array of asset matched objects  
        if (this.game.world.matched.length > 1) {
            this.game.world.matched.forEach(function(element) {
                element.drop();
        });

        
        }


    }
}

update () {
    // this.angle += 1;
   
    // mouse event click pushes function
    this.events.onInputDown.add(this.onClick, this);
  }

}