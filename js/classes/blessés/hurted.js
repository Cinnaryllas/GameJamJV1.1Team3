class hurted extends Phaser.Physics.Arcade.Sprite{
    
    constructor(_scene,_x,_y,_keyCache) {

        //_scene : scene phaser
        //_x et _y : position spawn joueur
        //_keyCache : clé access au cache
        super(_scene,_x,_y,_keyCache); //Permet d'hériter de la classe parent (ici Phaser.Physics.Arcade.Sprite)

        this.scene = _scene;  
        
        this.isBeingCarry = false;

        //Permet de créer le sprite et d'ajouter la physique au joueur.
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this. collider = this.scene.physics.add.collider(this,this.scene.colliders);
        
        this.setSize(96,32);
    }

    update() {
        if(joueur.isOverlapping && joueur.isLifting) {
            this.isBeingCarry = true;
            this.body.enable = false;
            this.setPosition(joueur.x, joueur.y-32);
        }
        else if (!joueur.isLifting){
            this.body.enable = true;
            this.refreshBody();
        }
    }
}