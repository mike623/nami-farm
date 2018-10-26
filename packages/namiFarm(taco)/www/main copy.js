var sprite;
var cursors;

// Create our 'main' state that will contain the game
var mainState = {



    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        game.load.spritesheet('mummy', './galleryanimals-1.png', 32, 32);
        // game.load.spritesheet('myguy', './dude-300x34.png', 38, 48);
    },

    create: function() {

      game.stage.backgroundColor = '#71c5cf';

      // var mummy = game.add.sprite(0, 0, 'mummy');
      sprite = game.add.sprite(100, 100, 'mummy');
      // var myguy = game.add.sprite(15, 30, 'myguy');

      // myguy.animations.add('left', [0, 1, 2, 3], 10, true);
      // myguy.animations.play('left');

      // var walk = mummy.animations.add('test');
      // //
      // mummy.animations.play('test', 10, true);

      game.physics.startSystem(Phaser.Physics.P2JS);
      //  Make things a bit more bouncey
      game.physics.p2.defaultRestitution = 0.8;
      sprite.animations.add('left', [12,13,14], 3, true);
      sprite.animations.add('right', [24,25,26], 3, true);



      game.physics.p2.enable(sprite);

      //  Modify a few body properties
    	sprite.body.setZeroDamping();
    	sprite.body.fixedRotation = true;

      game.time.events.loop(1500,  changeMove, this);

      cursors = game.input.keyboard.createCursorKeys();
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic

      if( sprite["MM"] === 1){
        sprite.body.moveLeft(50);
        sprite.animations.play('left');
      }else{
        sprite.body.moveRight(50);
        sprite.animations.play('right');
      }

    // if (cursors.left.isDown)
    // {
    //
    // }
    // else if (cursors.right.isDown)
    // {
    //
    // }
    //
    // if (cursors.up.isDown)
    // {
    // 	sprite.body.moveUp(400);
    // }
    // else if (cursors.down.isDown)
    // {
    // 	sprite.body.moveDown(400);
    // }


    },
};

function changeMove(){

  sprite["MM"] = sprite["MM"] || 1;
  sprite["MM"] *= -1;
}

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
