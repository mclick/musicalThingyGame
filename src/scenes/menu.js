class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.image('menu','assets/menu.png');
    }

    create(){

        this.menuScreen = this.add.sprite(400,300,'menu');
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start('creditsScene');
        }
    }
}