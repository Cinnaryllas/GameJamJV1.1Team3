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
        
        this.setSize(32,32);
    }

    update() {
        //Déclaration des varibales DistX et Y.
        var DistX;
        var DistY;

        //On calcul la distance entre le joueur et l'ennemi sur l'axe X.
        DistX = joueur.x - this.x;
        //On calcul la distance entre le joueur et l'ennemi sur l'axe Y.
        DistY = joueur.y - this.y;

        //On calcul la distance entre le joueur et l'ennemi.
        var distance = Math.sqrt(Math.pow(DistX,2)+Math.pow(DistY,2));
        if(joueur.isLifting) {
            this.body.enable = false;
            this.setPosition(joueur.x, joueur.y-32);
        }
        else if (!joueur.isLifting){
            this.body.enable = true;
            this.refreshBody();
        }
        //joueur.isOverlapping = false;
    }
}