class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('tiles', 'assets/tempTileSet.png');
        this.load.tilemapTiledJSON('map', 'assets/tempTileMap.json');
        this.load.image('plaer', 'assets/tempPlayer.png');
    }
    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tempTileSet', 'tiles');
        const platforms = map.createStaticLayer('layer1', tileset, 0, 0);

        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        platforms.setCollisionByExclusion(-1, true);
    }
    update(){

    }
}