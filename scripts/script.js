var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
    preload: preload,
    create: create,
    update: update
});

var ball;
function preload() {
    "use strict";
    // keep aspect ratio, but fill screen
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // align center horizontally and vertically
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // set background color
    game.stage.backgroundColor = "#111";
    
    game.load.image('ball', 'img/ball.png');

}

function create() {
    "use strict";
    // load Phaser's Arcarde physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ball = game.add.sprite(50, 50, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.set(150, 150);

}

// executed every frame
function update() {
    "use strict";

