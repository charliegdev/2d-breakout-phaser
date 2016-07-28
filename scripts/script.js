var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
    preload: preload,
    create: create,
    update: update
});

var ball, paddle, bricks, newBrick, brickInfo;
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
    game.load.image('brick', 'img/brick.png');
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

    // disable ball's collision detection on bottom of canvas
    game.physics.arcade.checkCollision.down = false;
    // detect ball falling off the bottom
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function() {
        alert("Game over!");
        location.reload();
    });

    // render paddle
    paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
    paddle.anchor.set(0.5, 1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;

    initBricks();
}

// executed every frame
function update() {
    "use strict";
    game.physics.arcade.collide(ball, paddle);
    game.physics.arcade.collide(ball, bricks, ballHitBrick);
    paddle.x = game.input.x || game.world.width * 0.5;

}

function initBricks() {
    "use strict";
    // info about a single brick, and a group of bricks as well.
    brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 7, 
            col: 3
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };

    // create an empty group of bricks
    bricks = game.add.group();

    var brickX, brickY;

    for (var col = 0; col < brickInfo.count.col; col++) {
        for (var row = 0; row < brickInfo.count.row; row++) {
            // create a new brick, and add it to the group.
            brickX = (row * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
            brickY = (col * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
            newBrick = game.add.sprite(brickX, brickY, 'brick');
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            bricks.add(newBrick);
        }
    }
}

function ballHitBrick(ball, brick) {
    "use strict";
    brick.kill();
}
