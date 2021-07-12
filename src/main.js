let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: [ Menu, Play ],
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{y: 1000},
            debug: true, //set to false before release
        }
    }
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
