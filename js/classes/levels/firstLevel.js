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

        this.cursors = this.input.keyboard.createCursorKeys();

        const map = this.make.tilemap({key:'map'});
        const tileset = map.addTilesetImage('tsProto','tileset');

        this.platforms = map.createLayer('platforms', tileset);
        //this.platforms.setCollisionByExclusion(-1, true);
        this.alienDoor = map.getObjectLayer('alienDoor');


        this.colliders =  this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.colliderLayer = map.getObjectLayer('collider');
        this.colliderLayer.objects.forEach(objectData=> {
            const {x = 0, y = 0, width = 0, height = 0} = objectData
            let colliders = this.add.rectangle(x, y, width, height).setOrigin(0,0)
            colliders = this.physics.add.existing(colliders)
            this.colliders.add(colliders)
        });


        // Création du joueur 
        map.getObjectLayer('player').objects.forEach((leJoueur) => {
            joueur = new player (this, leJoueur.x, leJoueur.y, 'joueur', 280);
            joueur.body.setMaxSpeed(800);
        });


        // Création des mines
        this._barbeles = this.physics.add.staticGroup()

        map.getObjectLayer('barbele').objects.forEach((barb) => {
            let obj = this._barbeles.create(barb.x, barb.y, "barbele"); 
            obj.setOrigin(0,0); 
            obj.refreshBody();
            obj.body.width = barb.width; 
            obj.body.height = barb.height;
        });


        // Création des barbelés
        this._mines = this.physics.add.staticGroup()

        map.getObjectLayer('mines').objects.forEach((mine) => {
            let obj = this._mines.create(mine.x, mine.y, "mine"); 
            obj.setOrigin(0,0); 
            obj.refreshBody();
            obj.body.width = mine.width; 
            obj.body.height = mine.height;
        });


        //On défini notre caméra comme caméra principale.
        this.cam = this.cameras.main;
        this.cam.setBounds(0, 0, map.widthInPixels*32, map.heightInPixels);
        this.cam.setBackgroundColor('rgba(255, 255, 255, 0.5)');

        
    }

    update ()
    {
        joueur.move(cursors);
        this.cam.startFollow(joueur);
    }
}