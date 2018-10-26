(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var money = 0;
var moneyRef = firebase.database().ref("money");

// Create our 'main' state that will contain the game
var mainState = {

    preload: function() {
        game.load.spritesheet("dog1", "./galleryanimals-1.png", 32, 32);




        game.load.image('player', 'assets/player.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');

        game.load.image('rpg_maker_vx_rtp_tileset_by_telles0808', './rpg_maker_vx_rtp_tileset_by_telles0808.png');
        game.load.image('hgss_set_by_akizakura16-da5h3mn', './hgss_set_by_akizakura16-da5h3mn.png');
        game.load.tilemap('map', './map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map2', './map2.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.atlasXML('buttonSet', './btn_sprite/blueSheet.png', './btn_sprite/blueSheet.xml');
        game.load.atlasXML('heart', './emotion/heart.png', './emotion/heart.xml');
        game.load.atlasXML('less', './emotion/sprites.png', './emotion/sprites.xml');

    },
    create: function() {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;



        // this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceLandscape = false;
        this.scale.parentIsWindow = true;
        // this.scale.setMinMax(320, 460, 768, 1024);
        this.scale.refresh();


        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // Create the tilemap
        this.map = game.add.tilemap('map2');

        // Add the tileset to the map
        this.map.addTilesetImage('hgss_set_by_akizakura16-da5h3mn');

        // Create the layer, by specifying the name of the Tiled layer
        this.layer = this.map.createLayer('Tile Layer 1');
        this.frence = this.map.createLayer('frence');

        console.log(this.frence);




        console.log(this.frence);


        this.layer.resizeWorld();
        this.frence.resizeWorld();

        var self = this;
        // Enable collisions for the first element of our tileset (the blue wall)
        [1049, 1050, 1051, 1057, 0, 1059, 1065, 1067].map(function(i){
            self.map.setCollision(i, true, self.frence);
        })

        game.stage.disableVisibilityChange = true;

        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.dog1 = game.add.group();
        this.dog1.enableBody = true;
        this.dog1.createMultiple(5, 'dog1');


        // var self = this;
        // _.times(5, function(){
        //   self.createDog();
        // });


        // this.createDog();
        this.createWorld();

        // game.time.events.loop(200,  this.createDog, this);

        this.changeDogTimer = game.time.events.loop(200,  this.changeDog, this);

        game.camera.setPosition(game.world.centerX / 2 , game.world.centerY /2);

        // setTimeout(function () {
        //   game.camera.follow(self.dog1.getFirstAlive());
        // }, 3000);


      //   If the device is not a desktop, so it's a mobile device



    },

    update: function() {

      // game.physics.arcade.collide(this.dog1, this.walls);
      game.physics.arcade.collide(this.dog1, this.frence, function (dog, wall) {
        dog.animations.stop();
      });

    },

    changeDog: function(){

      //check have dog
      var haveDog = this.dog1.getFirstAlive();
      if(!haveDog) return ;


      var dog = Phaser.ArrayUtils.getRandomItem(this.dog1.filter(function (e) {
        return e.alive;
      }).list)
      // console.log("move Dog", dog);

      dog.body.velocity.x = 0;
      dog.body.velocity.y = 0;
      dog.animations.stop();
      switch (game.rnd.integerInRange(0, 3)) {
        case 0:
          dog.body.velocity.x = -40;
          dog.animations.play("left");
          break;
        case 1:
          dog.body.velocity.x = 40;
          dog.animations.play("right");
          break;
        case 2:
          dog.body.velocity.y = -40;
          dog.animations.play("top");
          break;
        case 3:
          dog.body.velocity.y = 40;
          dog.animations.play("bottom");
          break;
        default:

      }

      this.changeDogTimer.delay = 3000 / this.dog1.filter(function(i){return i.alive}).list.length ;
    },

    createDog: function(){
      // console.log("createDog");
        var dog = this.dog1.getFirstDead();
        if(!dog){
          // console.log("no more dog");
            return;
        }

        console.log("create dog");
        dog.anchor.setTo(0.5, 0.5);
        dog.reset(game.world.centerX , game.world.centerY);
        // dog.reset(100, 100);
        // dog.body.gravity.y = 500;
        // dog.body.velocity.x = 100 * game.rnd.sign();
        // dog.body.bounce.x = 1;
        // dog.body.bounce.y = 1;
        dog.checkWorldBounds = true;
        dog.outOfBoundsKill = true;

        dog.animations.add('left', [12,13,14], 3, true);
        dog.animations.add('right', [24,25,26], 3, true);
        dog.animations.add('top', [36,37,38], 3, true);
        dog.animations.add('bottom', [0,1,2], 3, true);

        dog.inputEnabled = true;


        dog.events.onInputDown.add(function(){
          // dog.kill();
          var heart = game.make.sprite(0, -20, 'heart');
          var less = game.make.sprite(0, -20, 'less');
          heart.anchor.setTo(0.5, 0.5);
          heart.animations.add("animate");
          heart.animations.play("animate", 4, true);

          less.anchor.setTo(0.5, 0.5);
          less.animations.add("animate");
          less.animations.play("animate", 4, true);

          var animatetion  = _.sample([heart,less]);

          dog.addChild(animatetion)
          setTimeout(function(){
            dog.removeChild(animatetion);
          },3000);
        },this)



    },


    createWorld: function(){

      var button = game.add.button(20, game.camera.height - 10, 'buttonSet' , function () {
        if(money < 500){
          alert("要500蚊隻！ 求下老公比錢你＞3＜");
          return;
        }else{

          // console.log(this.dog1)
          if( this.dog1.filter(function(i){return i.alive}).list.length >= 5 ){
            alert("can only create 5 dogs")
            return;
          }

          money -= 500
          moneyRef.set(money);
          this.createDog();
        }
      }, this, "blue_circle.png", "blue_circle.png", "blue_circle.png");

      // var button2 = game.add.button( 60 , game.camera.height - 10, 'buttonSet' , function () {
      //   this.dog1.getFirstAlive().kill();
      // }, this, "blue_boxCross.png", "blue_boxCross.png", "blue_boxCross.png");


      button.fixedToCamera = true;
      button.anchor.setTo(0, 1);
      // button2.fixedToCamera = true;
      // button2.anchor.setTo(0, 1);


      var style = { font: "32px Arial", fill: "#ffffff", align: "center",  };

      text = game.add.text(0, 0, "$: "+ money , style);
      text.fixedToCamera = true;
      text.anchor.set(0);

      console.log(firebase)



      game.time.events.loop(4000, function(){
        if(money < 1) return ;
        moneyRef.set(money + 1)
      }  , this);

      firebase.database().ref("money").on('value', function(ds){
        money =  ds.val();
        text.text= "$: "+ money;
      })

    }
};



var game = new Phaser.Game(window.innerWidth , window.innerHeight , Phaser.AUTO);
// var game = new Phaser.Game( window.innerWidth, window.innerHeight );

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);






// Start the state to actually start the game
game.state.start('main');

},{}]},{},[1]);
