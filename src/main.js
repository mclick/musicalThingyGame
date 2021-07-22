let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ Menu, Play, Victory, Credits ],
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{y: 1000},
            debug: false, //set to false before release
        }
    }
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//rythem error tolerence
//tolerence is %within a beat.
let tolerence = 30;

let keyJump, keyLeft, keyRight, keyESC, keySpace, keyC;
let keyDebug; //used to dump debug info to console.