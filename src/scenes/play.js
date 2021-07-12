class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('tiles', 'assets/tempTileSet.png');
        this.load.tilemapTiledJSON('map', 'assets/tempTileMap.json');
        this.load.image('player', 'assets/tempPlayer.png');
        this.load.image('drums','assets/tempDrums.png');

        //load music
        this.load.audio('kick', './assets/tempkick.mp3');
        this.load.audio('whistle', './assets/tempwhistle.mp3');
        this.load.audio('synth', './assets/tempsynth.mp3');
    }
    create(){
        //creates tile map on screen
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tempTileSet', 'tiles');
        const platforms = map.createStaticLayer('layer1', tileset, 0, 0);
        //player physics
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.player.setDragX(200);
        this.physics.add.collider(this.player, platforms);
        platforms.setCollisionByExclusion(-1, true);
        //Drums exist now
        this.drums = this.add.sprite(600,600,'drums');
        //keyInputs
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //music
        this.kick = this.sound.add('kick', { loop: true });
        this.kick.play();
        this.kick.setVolume(0);
        this.synth = this.sound.add('synth', { loop: true });
        this.synth.play();
        this.synth.setVolume(1);
        this.whistle = this.sound.add('whistle', { loop: true });
        //this.whistle.play();
    }
    update(){
        if(keyLeft.isDown){
            this.player.setVelocityX(-200);
        }
        if(keyRight.isDown){
            this.player.setVelocityX(200);
        }
        //witchcraft
        //this.kick.seek gives the position in the track in seconds.  
        // .612 = 60/bpm
        // *100 followed by %100 does two things
        //      -trim the digits of n before the decimal point
        //      -sets things up so that tolerence %error of beat


        this.n= ((((this.kick.seek)/.612)*100)%100)-tolerence;
        if(Phaser.Input.Keyboard.JustDown(keyJump)&&(this.n<tolerence)&&(this.n>-tolerence)){
            this.player.setVelocityY(-800);
        }
    
        console.log(this.n);
        if(Phaser.Input.Keyboard.JustDown(keyJump)&&(this.n<tolerence)&&(this.n>-tolerence)){
            this.player.setVelocityY(-800);
        }
        if(this.checkCollision(this.player,this.drums)){
            this.drums.destroy();
            this.kick.setVolume(1);
        }
    }
    checkCollision(player, thing){
        if(player.x < thing.x + thing.width && 
            player.x + player.width > thing.x && 
            player.y < thing.y+thing.height&&
            player.height + player.y > thing.y){
            return true;
        }
        else{
            return false;
        }
    }
}