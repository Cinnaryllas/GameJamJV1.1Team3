class firstLevel extends Phaser.Scene {
    constructor() {
        super("firstLevel");
        Phaser.Scene.call(this, {key: 'firstLevel'});
    }

    preload ()
    {
        
    }

    create ()
    {  
        const map = this.make.tilemap({key:'map'});
        const tileset = map.addTilesetImage('tsProto','tiles');

        this.sol = map.createLayer('Sol', tileset);
        this.sol.setCollisionByExclusion(-1, true);
        this.eau = map.createLayer('Eau', tileset);
        this.eau.setCollisionByExclusion(-1, true);
        this.plateformes = map.createLayer('Plateformes', tileset);
        this.plateformes.setCollisionByExclusion(-1, true);
        this.obstacles = map.createLayer('Obstacles', tileset);
        this.obstacles.setCollisionByExclusion(-1, true);


        // Création du joueur 
        map.getObjectLayer('Player').objects.forEach((leJoueur) => {
            joueur = new player (this, leJoueur.x, leJoueur.y-64, 'joueur', 280);
            joueur.body.setMaxSpeed(800);
        });

        //On défini notre caméra comme caméra principale.
        cam = this.cameras.main;
        cam.setBounds(0, 0, map.widthInPixels*32, map.heightInPixels);
        cam.setBackgroundColor('rgba(255, 255, 255, 0.5)');

        
    }

    update ()
    {
        joueur.move(cursors);
        cam.startFollow(joueur);
    }
}