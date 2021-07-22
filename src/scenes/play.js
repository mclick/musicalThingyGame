class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){


        this.load.image('tiles', 'assets/tempTileSet.png');
        this.load.tilemapTiledJSON('map', 'assets/tileMap01.json');

        this.load.atlas('atlas', 'assets/monsterSpriteSheet.png', 'assets/monsterSpriteSheet.json');

        this.load.image('backround','assets/Background_Drawing.png');

        //load music
        this.load.audio('kick', './assets/finalkick.wav');
        this.load.audio('whistle', './assets/finalwhistle.wav');
        this.load.audio('synth', './assets/finalsynth.wav');
        this.load.audio('bass','./assets/finalbass.wav');
    }
    create(){
        this.backround = this.add.sprite(1600,1200,'backround');
        //creates tile map on screen
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tempTileSet', 'tiles');
        //make sure 'Tile Layer 1' is replaced with the appropiate layer name. Layer names will default to Tile Layer #
        const platforms = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
        //player physics
        this.playerframeNames = this.anims.generateFrameNames('atlas', {
            start: 1, end: 2, zeroPad: 0,
            prefix: 'playerFinal', suffix: ''
        });
        this.anims.create({ key: 'player', frames: this.playerframeNames, frameRate: 4, repeat: -1 });
        this.player = this.physics.add.sprite(64,2208,'atlas','playerFinal1').play('player');
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(false);
        this.player.setDragX(800);
        //Adds Collisions between the player and the platforms
        this.physics.add.collider(this.player, platforms);
        platforms.setCollisionByExclusion(-1, true);
        //Booleans to keep track of jumping
        this.jump1Avaliable = false;
        this.jump2Available = false;
        this.recentlyDoubleJumped=false;
        //Instruments exist now
        this.drumframeNames = this.anims.generateFrameNames('atlas', {
                start: 1, end: 2, zeroPad: 0,
                prefix: 'drumFinal', suffix: ''
            });
        this.anims.create({ key: 'drums', frames: this.drumframeNames, frameRate: 5, repeat: -1 });
        this.drums = this.add.sprite(1792,2220,'atlas','drumFinal1').play('drums');
        this.synthframeNames = this.anims.generateFrameNames('atlas', {
            start: 1, end: 2, zeroPad: 0,
            prefix: 'synthSnake', suffix: ''
        });
        this.anims.create({ key: 'synth', frames: this.synthframeNames, frameRate: 5, repeat: -1 });
        this.synthSnake = this.add.sprite(3000,1484,'atlas','synthSnake1').play('synth');
        this.kickframeNames = this.anims.generateFrameNames('atlas', {
            start: 1, end: 2, zeroPad: 0,
            prefix: 'kickMonster', suffix: ''
        });
        this.anims.create({ key: 'kick', frames: this.kickframeNames, frameRate: 5, repeat: -1 });
        this.kickMonster = this.add.sprite(2048,924,'atlas','kickMonster1').play('kick');
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
        this.synth.setVolume(0);
        //Used to Calculate when the synth spikes in the song - couldnt create a neat function to represent this like I could with the kick drums
        this.synthTimeArr = [0,1.8715,2.4515,4.8904,7.3455,7.6852,8.2753,8.8306]
        this.whistle = this.sound.add('whistle', { loop: true });
        this.whistle.play();
        this.bass= this.sound.add('bass',{loop: true});
        this.bass.play();
        this.bass.setVolume(0);
        this.bassTimeArr=[0.06,1.0514,1.9098,2.4873,3.4451,3.5521,4.911,5.9423,6.7396,7.8353,8.3431,8.4511];

        //Booleons to represent whether or not instruments have been picked up
        this.kickGot = false;
        this.synthGot = false;
        this.bassGot = false

        //Camera Stuff
        //.setBounds(left x bound, top y bound, right x bound, bottem y bound)
        //Should be .setBounds(0,0,width,height)
        this.cameras.main.setBounds(0, 0, 3200, 2400);
        this.cameras.main.startFollow(this.player);

        //Invisble win condition hit box
        this.winBox = new Phaser.Geom.Rectangle(864,320, 800, 224);
        
        //config info for tutorial text
        this.tutorialConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
    }
    update(){
        if(keyLeft.isDown){
            this.player.flipX = false;
            if(this.checkMusicTimer(this.synth.seek,this.synthTimeArr)&&keySpace.isDown&&this.player.body.velocity.x>-600&&this.synthGot){
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
            this.player.flipX = true;
            if(this.checkMusicTimer(this.synth.seek,this.synthTimeArr)&&keySpace.isDown&&this.player.body.velocity.x<600&&this.synthGot){
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
        if(this.player.y>2210){ //Catches the player if they clip below the map.  Possible when falling from great heights
            this.player.y = 2208;
            this.player.setVelocityY(0);
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
            this.recentlyDoubleJumped = false;
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
        if(Phaser.Input.Keyboard.JustDown(keyJump)&&this.kickGot){
            if(this.player.body.onFloor()&&this.jump1Avaliable==true){
                this.player.setVelocityY(-600);
            }
            else if(!this.player.body.onFloor()&&this.jump2Avaliable&&this.bassGot){
                this.jump2Available=false;
                this.recentlyDoubleJumped=true;
                this.player.setVelocityY(-600);
            }
        }
        //Checking Collisions with instruments
        if(this.checkCollision(this.player,this.drums)){
            this.add.text(1792, 2198,"Press W to Jump", this.tutorialConfig).setOrigin(0.5);
            this.add.text(1792, 2220,"Jump to the Beat",this.tutorialConfig).setOrigin(0.5);
            this.drums.destroy();
            this.kick.setVolume(1); 
            this.kickGot = true;

        }
        if(this.checkCollision(this.player,this.synthSnake)){
            this.add.text(2968, 1484,"Press Space to Dash", this.tutorialConfig).setOrigin(0.5);
            this.add.text(2968, 1452,"Dash to the Sound of the Synth",this.tutorialConfig).setOrigin(0.5);
            this.synthSnake.destroy();
            this.synth.setVolume(1); 
            this.synthGot = true;
        }
        if(this.checkCollision(this.player,this.kickMonster)){
            this.add.text(2048,892,"You can now double jump", this.tutorialConfig).setOrigin(0.5);
            this.add.text(2048,924,"But only to the sound of the bass",this.tutorialConfig).setOrigin(0.5);
            this.kickMonster.destroy();
            this.bass.setVolume(1); 
            this.bassGot = true;
        }
        //Return to menu
        if(keyESC.isDown){
            this.stopAllMusic();
            this.scene.start('menuScene');
        }
        if(this.checkCollision(this.player,this.winBox)){
            this.scene.start('victoryScene');
            this.stopAllMusic();
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

    stopAllMusic(){
        this.bass.stop();
        this.kick.stop();
        this.synth.stop();
        this.whistle.stop();
    }
}