class Victory extends Phaser.Scene {
    constructor(){
        super("victoryScene");
    }

    preload(){
    }

    create(){

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.victoryConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(400,300,'You Won!', this.victoryConfig).setOrigin(0.5);
        this.add.text(400,332,'Press Escape to return to the Menu', this.victoryConfig).setOrigin(0.5);;
        
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start('menuScene');
        }
    }
}