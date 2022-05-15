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
var blessePorte;

var _mines;
var mine;

var _obus;
var obusTirer;

var _barbeles;
var barbeles;
var inBarbed = false;

var safeZone;
var _groupZone;

var hasShoot = false;
var nRandomizeWait;
var nRandomizeX;
var nTimerBeforeShooting = 60;
var distX;
var nTimer = 0;

function preload() {
    this.load.image('tileset','assets/images/mur.png');
    this.load.tilemapTiledJSON('map','assets/map/no_mans_land.json');
    this.load.spritesheet('joueurWalk','assets/images/personnage/anim_personnage.png', { frameWidth: 256, frameHeight: 256, startFrame:14, endFrame: 17});
    this.load.spritesheet('joueurIdle','assets/images/personnage/anim_personnage.png', { frameWidth: 256, frameHeight: 256, startFrame:0, endFrame: 3});
    this.load.spritesheet('joueurCrouch','assets/images/personnage/anim_personnage.png', { frameWidth: 256, frameHeight: 256, startFrame:4, endFrame: 4});
    this.load.spritesheet('mine', 'assets/images/explosifs/mine.png', { frameWidth: 256, frameHeight: 256, endFrame: 2});
    this.load.image('obus', 'assets/images/explosifs/obus.png')
    this.load.image('barbele','../assets/proto sprites/barbele.png');
    this.load.image('radiusExplo','assets/images/RadiusExplo.png');
}

function create() {
    var clignote = {
        key: 'clignote',
        frames: this.anims.generateFrameNumbers('mine', { start: 0, end: 1, first: 0 }),
        frameRate: 2,
        repeat: -1
    };

    this.anims.create(clignote);

    var walk = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('joueurWalk', { start: 14, end: 17, first: 14 }),
        frameRate: 4,
        repeat: -1
    };

    var idle = {
        key: 'idle',
        frames: this.anims.generateFrameNumbers('joueurIdle', { start: 0, end: 3, first: 0 }),
        frameRate: 4,
        repeat: -1
    };

    var crouch = {
        key: 'crouch',
        frames: this.anims.generateFrameNumbers('joueurCrouch', { start: 4, end: 4, first: 4 }),
        frameRate: 4,
        repeat: -1
    };

    this.anims.create(clignote);
    this.anims.create(walk);
    this.anims.create(idle);
    this.anims.create(crouch);

    _mines = this.physics.add.staticGroup({
        runChildUpdate: true,
    });
    _obus = this.physics.add.group({
        runChildUpdate: true,
    });
    _barbeles = this.physics.add.staticGroup();
    _blesses = this.physics.add.group({
        runChildUpdate: true,
    });

    _groupZone = this.physics.add.group({
        runChildUpdate: true,
    });

    game.scene.add('mainMenu', mainMenu, true);
    game.scene.add('firstLevel', firstLevel, false);
    game.scene.add('lvlSelect', lvlSelect, false);
    game.scene.add('credits', credits, false);
    //game.scene.add('tutorial', tutorial, false);
}

function update() {

}