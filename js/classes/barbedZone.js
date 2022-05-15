class barbedZone extends Phaser.Physics.Arcade.Sprite {
    
    constructor (_scene,_x,_y) {
        super (_scene,_x,_y,"barbZone");
 
        //PHYSICS
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setPushable(false);

        //VARIABLES GLOBALES
        this.scene = _scene;

        
        this.scene.physics.add.collider(this,joueur,function(zone,nurse){
            console.log('overlap');
            if (!nurse.inBarbed){
                nurse.inBarbed = true;
            }
            if (nurse.inBarbed){
                nurse.inBarbed = false;
            }
            
        });
    }
}