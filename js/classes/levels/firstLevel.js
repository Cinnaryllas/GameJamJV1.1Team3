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


        // Création des mines
        map.getObjectLayer('mines').objects.forEach((min) => {
            mine = new mines(this, min.x, min.y+4, 'mine');
            mine.body.allowGravity = false;
            _mines.add(mine);
        });

        map.getObjectLayer('barbele').objects.forEach((barb) => {
            barbeles = new barbed(this, barb.x, barb.y+12, 'barbele');
            _barbeles.add(barbeles)
        });

        blesse = new hurted(this, joueur.x + 64, joueur.y, 'player');
        _blesses.add(blesse);

        //On défini notre caméra comme caméra principale.
        this.cam = this.cameras.main;
        this.cam.setBounds(0, 0, map.widthInPixels*32, map.heightInPixels);
        this.cam.setBackgroundColor('rgba(255, 255, 255, 0.5)');

        this.physics.add.overlap(joueur, blesse, function() {
            joueur.isOverlapping = true;
            if (joueur.isOverlapping && joueur.isLifting) {
                blesse.setPosition(joueur.x, joueur.y-32);
            }
        })
    }

    update (NONE, delta)
    {
        joueur.move(cursors);
        joueur.crawl();
        joueur.climb();

        this.cam.startFollow(joueur);

        if (hasShoot == false) {
            hasShoot = true;
            this.nRandomizeX = Math.floor(Math.random() * 1000) -500
            this.distX = this.nRandomizeX+joueur.x

            obusTirer = new obus(this, this.distX, -400, "mine");
            obusTirer.setVelocityX(-200);
            _mines.children.each(child => {
                this.physics.add.collider(child, obusTirer.explosionRadius, function(){
                    child.destroy(true);
                }, null, this);
            })
            _obus.add(obusTirer);
            nRandomizeWait = Math.random () * 2.5 + 1.5;
        }
            
        if (hasShoot){
            nTimer += delta/1000;
            if (nTimer >= nRandomizeWait){
                hasShoot = false;
                nTimer = 0;
            }
        }        
    }
}