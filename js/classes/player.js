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
        this.overlapBarbele = false;
        this.inBarbed = false;
        this.isCrawling = false;
        this.climbingLeft = false;
        this.climbingRight = false;

        this.ZKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.QKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.SKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.FKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.Ctrl = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        this. collider = this.scene.physics.add.collider(this,this.scene.colliders);


        

        //Permet de créer le sprite et d'ajouter la physique au joueur.
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.setMaxVelocity(300);
    }

    //Fcontion move qui permet au joueur de se déplacer.
    move(cursors) {
        /*if (!this.inBarbed){
            this.setMaxVelocity(300);
        }
      

        if (this.inBarbed){
            this.setMaxVelocity(60);
        }*/

        if(!this.isLifting && !this.isCrawling) {
            this.setBodySize(16,32);
            this.setMaxVelocity(200,300);
            //Si la touche "flèche gauche" est appuyée, on met la véloctiéX du joueur à -la vitesse du joueur. (- pour aller à gauche.)
            if (this.scene.cursors.left.isDown || this.QKey.isDown)
            {
                this.setAccelerationX(-this.nSpeed*2);
            }
            //Si la touche "flèche droite" est appuyée, on met la véloctiéX du joueur à +la vitesse du joueur. (+ pour aller à droite.)
            else if (this.scene.cursors.right.isDown || this.DKey.isDown)
            {
                this.setAccelerationX(this.nSpeed*2);
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
        


        if (this.climbingLeft){
            //this.allowGravity(false);
            this.setAccelerationY(-900);
            
        }

        if (this.climbingRight){
            //this.allowGravity(false);
            this.setAccelerationY(-900);
            

        }
        
        if (this.climbingLeft || this.climbingRight){
            //this.setAccelerationY(0);
        }

        if (!this.isLifting && this.isCrawling){
            this.setBodySize(32,16);
            this.setMaxVelocity(75,300);
            
        }


        if(Phaser.Input.Keyboard.JustDown(this.FKey)) {
            if (!this.isLifting) {
                this.isLifting = true;
            }
            else {
                this.isLifting = false;
            }
        }

        if ((this.ZKey.isDown || this.scene.cursors.up.isDown) && (this.body.touching.down)){
            this.setVelocityY (-300);
        }
    }


    crawl(){
        if (!this.climbingLeft && !this.climbingRight){
            if (Phaser.Input.Keyboard.JustDown(this.Ctrl)){
                if (this.isCrawling){
                    this.isCrawling = false;
                    this.setPosition(this.x,this.y-8);
                }
                else {
                    this.isCrawling = true;
                    this.setPosition(this.x,this.y+8);
                    
                }
            }
        }
    }


    climb(){
        if (!this.isCrawling){
            if(this.body.blocked.left) { 
                this.climbingLeft = true; 
                this.setMaxVelocity(50);
            }
    
            if (this.climbingLeft && !this.body.blocked.left){ 
                this.climbingLeft = false;
                this.setAccelerationY(0);
            }
    
            if(this.body.blocked.right) { 
                this.climbingRight = true; 
                this.setMaxVelocity(50);
            }
    
            if (this.climbingRight && !this.body.blocked.right){ 
                this.climbingRight = false;
                this.setAccelerationY(0);
            }
        }
    }
}