class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create(){

        //menu config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text
        this.add.text(game.config.width/2, game.config.height/2-borderUISize*2-borderPadding*2, 'Music Prototype', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-borderUISize-borderPadding, 'Use (A) and (D) keys to move, and (W) to jump', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'You can only jump to the beat of the drums', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2+borderUISize+borderPadding, 'Pick up the drums to hear the beat', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2+borderUISize*2+borderPadding*2, 'Press (W) to start', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2+borderUISize*3+borderPadding*3, 'and Escape key to return to the menu', menuConfig).setOrigin(0.5)

        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            this.scene.start('playScene');
        }
    }
}