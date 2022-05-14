class barbed extends Phaser.Physics.Arcade.Sprite {
    
    constructor (_scene,_x,_y) {
        super (_scene,_x,_y,"barbele");
 
        //PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //VARIABLES GLOBALES
        this.scene = _scene;

        this.body.allowGravity = false; 
        this.scene.physics.add.overlap(this, joueur, this.ralentissement, null, this);       
    }

    ralentissement() {
        inBarbed = true;
        if (joueur.isLifting){
            joueur.isLifting = false;
        }
    }
}