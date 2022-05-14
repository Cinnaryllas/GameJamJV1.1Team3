class player extends Phaser.Physics.Arcade.Sprite{
    
    constructor(_scene,_x,_y,_keyCache, _speed) {

        //_scene : scene phaser
        //_x et _y : position spawn joueur
        //_keyCache : clé access au cache
        super(_scene,_x,_y,_keyCache); //Permet d'hériter de la classe parent (ici Phaser.Physics.Arcade.Sprite)

        //On défini la vitesse du joueur lors de sa création.
        this.nSpeed = _speed;

        this.scene = _scene;

        this.isLifting = false;
        

        this.ZKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.QKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.SKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.FKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.Ctrl = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CONTROL);

        this.scene.physics.add.collider(this,this.scene.colliders);

        //Permet de créer le sprite et d'ajouter la physique au joueur.
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.setMaxVelocity(300);
    }

    //Fcontion move qui permet au joueur de se déplacer.
    move(cursors) {
        if(!this.isLifting) {
            //Si la touche "flèche gauche" est appuyée, on met la véloctiéX du joueur à -la vitesse du joueur. (- pour aller à gauche.)
            if (this.scene.cursors.left.isDown || this.QKey.isDown)
            {
                this.setAccelerationX(-this.nSpeed);
            }
            //Si la touche "flèche droite" est appuyée, on met la véloctiéX du joueur à +la vitesse du joueur. (+ pour aller à droite.)
            else if (this.scene.cursors.right.isDown || this.DKey.isDown)
            {
                this.setAccelerationX(this.nSpeed);
            }
            else
            {
                this.setAccelerationX (0);
            }
        }
        else {
            if (this.scene.cursors.left.isDown || this.QKey.isDown)
            {
                this.setAccelerationX(-this.nSpeed/2);
            }
            //Si la touche "flèche droite" est appuyée, on met la véloctiéX du joueur à +la vitesse du joueur. (+ pour aller à droite.)
            else if (this.scene.cursors.right.isDown || this.DKey.isDown)
            {
                this.setAccelerationX(this.nSpeed/2);
            }
            else
            {
                this.setAccelerationX (0);
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.FKey)) {
            if (!this.isLifting) {
                this.isLifting = true;
            }
            else {
                this.isLifting = false;
            }
        }
    }
}