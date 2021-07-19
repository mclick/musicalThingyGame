class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('tiles', 'assets/tempTileSet.png');
        this.load.tilemapTiledJSON('map', 'assets/tileMap01.json');
        this.load.image('player', 'assets/player.png');
        this.load.image('drums','assets/drum1.png');

        //load music
        this.load.audio('kick', './assets/tempkick.mp3');
        this.load.audio('whistle', './assets/tempwhistle.mp3');
        this.load.audio('synth', './assets/tempsynth.mp3');
        this.load.audio('bass','./assets/tempbass.mp3');
    }
    create(){
        //creates tile map on screen
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tempTileSet', 'tiles');
        const platforms = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        //player physics
        this.player = this.physics.add.sprite(64, 2000, 'player');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(false);
        this.player.setDragX(400);
        this.physics.add.collider(this.player, platforms);
        platforms.setCollisionByExclusion(-1, true);
        //Booleans to keep track of jumping
        this.jump1Avaliable = false;
        this.jump2Available = false;
        this.recentlyDoubleJumped=false;
        //Drums exist now
        this.drums = this.add.sprite(1792,2208,'drums');
        //keyInputs
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //music
        this.kick = this.sound.add('kick', { loop: true });
        this.kick.play();
        this.kick.setVolume(0);
        this.synth = this.sound.add('synth', { loop: true });
        this.synth.play();
        this.synth.setVolume(1);
        //Used to Calculate when the synth spikes in the song - couldnt create a neat function to represent this like I could with the kick drums
        this.synthTimeArr = [0,1.8715,2.4515,4.8904,7.3455,7.6852,8.2753,8.8306]
        this.whistle = this.sound.add('whistle', { loop: true });
        this.whistle.play();
        this.bass= this.sound.add('bass',{loop: true});
        this.bass.play();
        this.bassTimeArr=[0.06,1.0514,1.9098,2.4873,3.4451,3.5521,4.911,5.9423,6.7396,7.8353,8.3431,8.4511];

        //Camera Stuff
        this.cameras.main.setBounds(0, 0, 3200, 2400);
        this.cameras.main.startFollow(this.player);
    }
    update(){
        if(keyLeft.isDown){
            this.player.flipX = true;
            if(this.checkMusicTimer(this.synth.seek,this.synthTimeArr)&&keySpace.isDown&&this.player.body.velocity.x>-600){
                this.player.setAccelerationX(-2000);
            }
            else if(this.player.body.velocity.x>-300){
                this.player.setAccelerationX(-800);
            }
            else{
                this.player.setAccelerationX(0);
            }
        }
        else if(keyRight.isDown){
            this.player.flipX = false;
            if(this.checkMusicTimer(this.synth.seek,this.synthTimeArr)&&keySpace.isDown&&this.player.body.velocity.x<600){
                this.player.setAccelerationX(2000);
            }
            else if(this.player.body.velocity.x<300){
                this.player.setAccelerationX(800);
            }
            else{
                this.player.setAccelerationX(0);
            }
        }
        else{
            this.player.setAccelerationX(0);
        }
        //witchcraft
        //this.kick.seek gives the position in the track in seconds.  
        // .612 = 60/bpm
        // *100 followed by %100 does two things
        //      -trim the digits of n before the decimal point
        //      -sets things up so that tolerence = %error of beat
        this.n= ((((this.kick.seek)/.612)*100)%100)-tolerence;
        if(this.player.body.onFloor()&&(this.n<tolerence)&&(this.n>-tolerence)){
            this.jump1Avaliable = true;
            this.recentlyDoubleJumped=false;
        }
        else{
            this.jump1Avaliable = false;
        }
        if(this.checkMusicTimer(this.bass.seek,this.bassTimeArr)&&this.recentlyDoubleJumped==false){
            this.jump2Avaliable = true;
        }
        else{
            this.jump2Avaliable = false;
        }
        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            if(this.player.body.onFloor()&&this.jump1Avaliable==true){
                this.player.setVelocityY(-600);
            }
            else if(!this.player.body.onFloor()&&this.jump2Avaliable){
                this.jump2Available=false;
                this.recentlyDoubleJumped=true;
                this.player.setVelocityY(-600);
            }
        }
        if(this.checkCollision(this.player,this.drums)){
            this.drums.destroy();
            this.kick.setVolume(1); 
        }
        //Return to menu
        if(keyESC.isDown){
            this.scene.start('menuScene');
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

    checkMusicTimer(time, songTimeArr){
        for(var i =0;i<songTimeArr.length;i++){
            if(time>songTimeArr[i]-tolerence/75&&time<songTimeArr[i]+tolerence/75){
                return true;
            }
        }
        return false;
    }
}