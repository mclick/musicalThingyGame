class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('tiles', 'assets/tempTileSet.png');
        this.load.tilemapTiledJSON('map', 'assets/tempTileMap.json');
        this.load.image('player', 'assets/tempPlayer.png');

        //load music
        this.load.audio('kick', './assets/tempkick.mp3');
        this.load.audio('whistle', './assets/tempwhistle.mp3');
    }
    create(){
        //creates tile map on screen
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tempTileSet', 'tiles');
        const platforms = map.createStaticLayer('layer1', tileset, 0, 0);
        //
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(.9);
        this.player.setCollideWorldBounds(true);
        this.player.setDragX(200);
        this.physics.add.collider(this.player, platforms);
        platforms.setCollisionByExclusion(-1, true);
        //keyInputs
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //music
        this.kick = this.sound.add('kick', { loop: true });
        this.kick.play();
        this.whistle = this.sound.add('whistle', { loop: true });
        this.whistle.play();
    }
    update(){
        if(keyLeft.isDown){
            this.player.setVelocityX(-200);
        }
        if(keyRight.isDown){
            this.player.setVelocityX(200);
        }
        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            this.player.setVelocityY(-400);
        }
    }
}