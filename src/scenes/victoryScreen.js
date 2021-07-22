class Victory extends Phaser.Scene {
    constructor(){
        super("victoryScene");
    }

    preload(){
        this.load.image('vic','assets/victory.png');
    }

    create(){

        this.menuScreen = this.add.sprite(400,300,'vic');
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start('menuScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start('creditsScene');
        }
    }
}