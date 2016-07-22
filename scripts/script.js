var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
    preload: preload,
    create: create,
    update: update
});

var ball, paddle;
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
    game.load.image('paddle', 'img/paddle.png');

}

function create() {
    "use strict";
    // load Phaser's Arcarde physics engine
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
    ball.anchor.set(0.5);

    // enable physics for the ball
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    // make ball stay within bounds
    ball.body.collideWorldBounds = true;
    // ball bounce after it hit its bounds
    ball.body.bounce.set(1);
    ball.body.velocity.set(150, -150);

    // render paddle
    paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
    paddle.anchor.set(0.5, 1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;

}

// executed every frame
function update() {
    "use strict";
    game.physics.arcade.collide(ball, paddle);
    paddle.x = game.input.x || game.world.width * 0.5;
}
