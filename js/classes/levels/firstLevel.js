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


        // Création des barbelés
        this._barbeles = this.physics.add.staticGroup()

        map.getObjectLayer('barbele').objects.forEach((barb) => {
            let obj = this._barbeles.create(barb.x, barb.y, "barbele"); 
            obj.setOrigin(0,0); 
            obj.refreshBody();
            obj.body.width = barb.width; 
            obj.body.height = barb.height;
        });


        // Création des mines
        map.getObjectLayer('mines').objects.forEach((min) => {
            mine = new mines(this, min.x, min.y+4, 'mine');
            mine.body.allowGravity = false;
            _mines.add(mine);
        });


        //On défini notre caméra comme caméra principale.
        this.cam = this.cameras.main;
        this.cam.setBounds(0, 0, map.widthInPixels*32, map.heightInPixels);
        this.cam.setBackgroundColor('rgba(255, 255, 255, 0.5)');
    }

    update (NONE, delta)
    {
        joueur.move(cursors);
        this.cam.startFollow(joueur);      

        if (hasShoot == false) {
            hasShoot = true;
            this.nRandomizeX = Math.floor(Math.random() * 1000) -500
            this.distX = this.nRandomizeX+joueur.x

            obusTirer = new obus(this, this.distX, -400, "mine");
            obusTirer.setVelocityX(-200);
            _obus.add(obusTirer);
            nRandomizeWait = Math.random () * 2.5 + 1.5;
        }

        _mines.children.each(child => {
            _obus.children.each(child2 => {
            this.physics.add.overlap(child, child2.explosionRadius, child.selfDestroy, null, this)  
            });
        })
            
        if (hasShoot){
            nTimer += delta/1000;
            if (nTimer >= nRandomizeWait){
                hasShoot = false;
                nTimer = 0;
            }
        }
        
    }
}