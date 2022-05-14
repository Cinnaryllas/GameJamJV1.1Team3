class mines extends Phaser.Physics.Arcade.Sprite{
    constructor(_scene,_x,_y,_keyCache) {

        //_scene : scene phaser
        //_x et _y : position spawn joueur
        //_keyCache : clé access au cache
        super(_scene,_x,_y,_keyCache); //Permet d'hériter de la classe parent (ici Phaser.Physics.Arcade.Sprite)

        this.scene = _scene;

        //Permet de créer le sprite et d'ajouter la physique au joueur.
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.body.allowGravity = false;
        this.body.immovable = true;

        this.scene.physics.add.overlap(this, joueur, this.explode, null, this);
        this.scene.physics.add.collider(this, _obus, this.selfDestroy, null, this);
    }

    selfDestroy() {
        this.destroy(true);
    }

    explode() {
        this.destroy(true);
        joueur.death();
    }
}