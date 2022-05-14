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

//Variables pour le joueur
var joueur;