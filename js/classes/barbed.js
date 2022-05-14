class barbed extends Phaser.Physics.Arcade.Sprite {
    
    constructor (_scene,_x,_y) {
        super (_scene,_x,_y,"barbele");
 
        //PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setPushable(false);

        //VARIABLES GLOBALES
        this.scene = _scene;

    }
}