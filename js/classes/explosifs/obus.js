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

        this.explosionRadius = this.scene.physics.add.sprite(this.x, this.y, 'mine').setVisible(false).setOrigin(0.5,0.5).setSize(128,128);
        this.explosionRadius.body.allowGravity = false;

        this.scene.physics.add.collider(this, this.scene.colliders, this.destroySelf, null, this);
        this.scene.physics.add.collider(this, _mines, this.destroySelf, null, this);
        this.scene.physics.add.overlap(this.explosionRadius, joueur, this.explode, null, this)

    }

    destroySelf() {
        this.explosionRadius.setPosition(this.x, this.y);
        this.setVelocity(0);
        this.setVisible(false);
        this.explosion = true;
    }

    explode() {;
        joueur.death();
    }

    update(NONE, delta){

        if(this.explosion) {
            console.log(this.nTimerExplosion);
            this.nTimerExplosion += delta/1000;
            if (this.nTimerExplosion >= 0.25){
                this.explosion = false;
                this.explosionRadius.destroy(true);
                this.destroy(true);
                this.nTimerExplosion = 0;
            }
        }
    }
}