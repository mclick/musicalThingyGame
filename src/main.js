/*  This Comment is literally just the Readme file copy and pasted.
Programmer -- Matthew
Music -- Jordan
Art Assets -- Cameron + Stanley

Our aesthetic experience goal was to make a kind of upbeat game,
that the player could get lost in when playing it.

Our theme is Lost and Found,  which arises in the fact that you
must find various instruments to gain new abilities and music.


*/
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

