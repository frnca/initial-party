import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, gridPositionX, gridPositionY, gridName}) {
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

    // creates drop animation on object
    this.drop = function(){
        this.game.add.tween(this.body).to({ y: 300 }, 200, Phaser.Easing.Linear.None, true);
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

            // alert(element.gridName);          
          };
        });

        // drop animation on all array of asset matched objects  
        if (obj.game.world.matched.length > 1) {
            obj.game.world.matched.forEach(function(element) {
              element.drop();
            });
        }
            
    }
   


    this.onClick = function() {
        // new empty array
        this.game.world.matched = new Array();

        // start mathing engine
        this.checkNeighbors(this);
    }
}

update () {
    // this.angle += 1;
   
    // mouse event click pushes function
    this.events.onInputDown.add(this.onClick, this);
  }

}