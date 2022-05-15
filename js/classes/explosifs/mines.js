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

        this.defuseZone = this.scene.add.zone(this.x , this.y).setSize(64,64);
        this.scene.physics.world.enable(this.defuseZone);
        this.defuseZone.body.setAllowGravity(false);
        this.defuseZone.body.moves = false;

        this.defuseZone.overlaping = false;

        this.scene.physics.add.overlap(this.defuseZone,joueur,function(zone,chara){
            zone.overlaping = true;
            //console.log(zone.overlaping);
        });

        
        /*this.spinHitboxLeft = this.add.zone(this.player.x - this.spinHitboxDistance/2, this.player.y).setSize(this.spinHitboxSize, this.spinHitboxSize);
        this.physics.world.enable(this.spinHitboxLeft);
        this.spinHitboxLeft.body.setAllowGravity(false);
        this.spinHitboxLeft.body.moves = false;
        this.physics.add.overlap(this.spinHitboxLeft, this.enemies, (hitbox, enemy) =>{
            enemy.getKilled();
        });*/
    }

    selfDestroy() {
        this.destroy(true);
    }

    explode() {
        this.destroy(true);
        joueur.death();
    }

    update(){
        if (this.defuseZone.overlaping && this.scene.EKey.isDown && joueur.body.touching.down && !joueur.isLifting){
            console.log("oui");
            this.defuseZone.destroy();
            this.selfDestroy();            
        }
    }
}