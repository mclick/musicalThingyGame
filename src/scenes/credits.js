class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    preload(){
    }

    create(){

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.bigCredisConfig = {
            fontFamily: 'Courier',
            fontSize: '64px',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(400,128,'CREDITS!', this.bigCreditsConfig).setOrigin(0.5);

        this.redisConfig = {
            fontFamily: 'Courier',
            fontSize: '32px',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(128,200,'Programming: Matthew Click', this.creditsConfig);
        this.add.text(128,264,'Sound and Level Design: Jordan Fickel', this.creditsConfig);
        this.add.text(128,328,'Player and Creature Animation: Stanley Caldwell', this.creditsConfig);
        this.add.text(128,392,'Background Artwork: Cameron Henritzy', this.creditsConfig);
        this.add.text(400,536,'Press Escape to return to the Menu', this.creditsConfig).setOrigin(0.5);
    
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start('menuScene');
        }
    }
}