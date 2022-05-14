var config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity : {y :800},
            debug: true
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: {
        preload : preload, 
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);

//Variables pour les contrôles
var cursors;
var pointer;

var nbLettres = 0;

//Variables pour le joueur
var joueur;

var _blesses;
var blesse;

var _mines;
var mine;

var _obus;
var obusTirer;

var _barbeles;
var barbeles;
var inBarbed = false;

var hasShoot = false;
var nRandomizeWait;
var nRandomizeX;
var distX;
var nTimer = 0;

function preload() {
    this.load.image('tileset','../assets/proto sprites/spritesheet-proto.png');
    this.load.tilemapTiledJSON('map','../assets/map/mapProto.json');
    this.load.image('joueur','../assets/proto sprites/joueur.png');
    this.load.image('mine','../assets/proto sprites/mine.png');
    this.load.image('barbele','../assets/proto sprites/barbele.png');
}

function create() {
    _mines = this.physics.add.staticGroup();
    _obus = this.physics.add.group({
        runChildUpdate: true,
    });
    _barbeles = this.physics.add.staticGroup();
    _blesses = this.physics.add.group({
        runChildUpdate: true,
    });

    game.scene.add('firstLevel', firstLevel, true);
}

function update() {

}