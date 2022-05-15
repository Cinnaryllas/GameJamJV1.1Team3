class zone extends Phaser.Physics.Arcade.Sprite{
    
    constructor(_scene,_x,_y,_keyCache) {

        //_scene : scene phaser
        //_x et _y : position spawn joueur
        //_keyCache : clé access au cache
        super(_scene,_x,_y,_keyCache); //Permet d'hériter de la classe parent (ici Phaser.Physics.Arcade.Sprite)

        this.scene = _scene;  
        
        this.zone = false;

        this.overlaping = false;

        //Permet de créer le sprite et d'ajouter la physique au joueur.
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this. collider = this.scene.physics.add.collider(this,this.scene.colliders);

        this.setSize(128*4,128*4)
        this.body.setAllowGravity(false);
        this.body.moves = false;
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
        _blesses.children.each(child => {
            this.scene.physics.add.overlap(this,child,function(){
                if(distance > 1024)
                {
                    nbLettres +=1;
                    child.destroy(true);
                }
            });
        });
    }
}