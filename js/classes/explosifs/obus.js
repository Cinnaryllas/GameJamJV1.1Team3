class obus extends Phaser.Physics.Arcade.Sprite{
    constructor(_scene,_x,_y,_keyCache) {

        //_scene : scene phaser
        //_x et _y : position spawn joueur
        //_keyCache : clé access au cache
        super(_scene,_x,_y,_keyCache); //Permet d'hériter de la classe parent (ici Phaser.Physics.Arcade.Sprite)

        this.scene = _scene;
        this.explosion = false;
        this.nTimerExplosion = 0;

        //Permet de créer le sprite et d'ajouter la physique au joueur.
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.setVelocityX(-200);

        this.explosionRadius = this.scene.physics.add.sprite(this.x, this.y, 'joueur').setVisible(false).setOrigin(2,2).setCircle(64);
        this.explosionRadius.body.allowGravity = false;
        this.explosionRadiusSprite = this.scene.physics.add.sprite(this.x, this.y, 'radiusExplo').setVisible(true).setOrigin(0.5,0.5).setScale(4,4).setAlpha(0.5);
        this.explosionRadiusSprite.body.allowGravity = false;

        this.scene.physics.add.collider(this, this.scene.colliders, this.destroySelf, null, this);
        this.scene.physics.add.collider(this, _mines, this.destroySelf, null, this);
        this.scene.physics.add.overlap(this.explosionRadius, joueur, this.explode, null, this)

    }

    destroySelf() {
        //Déclaration des varibales DistX et Y.
        var DistX;
        var DistY;

        //On calcul la distance entre le joueur et l'ennemi sur l'axe X.
        DistX = joueur.x - this.x;
        //On calcul la distance entre le joueur et l'ennemi sur l'axe Y.
        DistY = joueur.y - this.y;

        //On calcul la distance entre le joueur et l'ennemi.
        var distance = Math.sqrt(Math.pow(DistX,2)+Math.pow(DistY,2));
        this.scene.cam.shake(100,0.5/(distance*0.2), false)
        this.explosionRadius.setPosition(this.x, this.y);
        this.explosionRadiusSprite.setPosition(this.x, this.y);
        this.setVelocity(0);
        this.setVisible(false);
        this.explosion = true;
    }

    explode() {;
        joueur.death();
    }

    update(NONE, delta){

        

        if(this.explosion) {
            this.nTimerExplosion += delta/1000;
            if (this.nTimerExplosion >= 0.25){
                this.explosion = false;
                this.explosionRadius.destroy(true);
                this.explosionRadiusSprite.destroy(true);
                this.destroy(true);
                this.nTimerExplosion = 0;
            }
        }
        else{ this.x -= 3;}
    }
}