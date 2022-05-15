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
        this.isCrawling = false;
        this.climbingLeft = false;
        this.climbingRight = false;
        this.isOverlapping = false;
        this.falling = false;
        this.direction = 0;

        this.ZKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.QKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.SKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.FKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.Ctrl = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        this.collider = this.scene.physics.add.collider(this,this.scene.colliders, function (){this.falling = false}, null, this);        

        //Permet de créer le sprite et d'ajouter la physique au joueur.
        _scene.add.existing(this);
        _scene.physics.add.existing(this);

        this.walk = this.scene.add.sprite(this.x, this.y, 'joueurWalk')
        this.idle = this.scene.add.sprite(this.x, this.y, 'joueurIdle')
        this.crouch = this.scene.add.sprite(this.x, this.y, 'joueurCrouch');
    }

    //Fcontion move qui permet au joueur de se déplacer.
    move(cursors) {

        if(!this.isLifting && !this.isCrawling) {
            this.setBodySize(64,250);
            this.setMaxVelocity(200*4,300*4);
            //Si la touche "flèche gauche" est appuyée, on met la véloctiéX du joueur à -la vitesse du joueur. (- pour aller à gauche.)
            if (this.scene.cursors.left.isDown || this.QKey.isDown)
            {
                this.setAccelerationX(-this.nSpeed*2);
                this.flipX=true;
                this.anims.play('walk', true);
            }
            //Si la touche "flèche droite" est appuyée, on met la véloctiéX du joueur à +la vitesse du joueur. (+ pour aller à droite.)
            else if (this.scene.cursors.right.isDown || this.DKey.isDown)
            {
                this.setAccelerationX(this.nSpeed*2);
                this.flipX=false;
                this.anims.play('walk', true);
            }
            else if ((this.scene.cursors.left.isUp || this.QKey.isUp) && (this.scene.cursors.right.isUp || this.DKey.isUp)) {
                if (this.body.velocity.x < -0.10) {
                    this.setAccelerationX(this.nSpeed*1.5);
                }
                else if (this.body.velocity.x > 0.10){
                    this.setAccelerationX(-this.nSpeed*1.5);
                } 
                if(this.body.velocity.x < 0.15 && this.body.velocity.x > -0.15) {
                    this.anims.play('idle');
                }
            }
            else
            {
                this.setAccelerationX (0);
            }

        }
        else if (this.isLifting && !this.isCrawling){
            this.setMaxVelocity(75*4,300*4);
            if (this.scene.cursors.left.isDown || this.QKey.isDown)
            {
                this.setAccelerationX(-this.nSpeed/2);
            }
            //Si la touche "flèche droite" est appuyée, on met la véloctiéX du joueur à +la vitesse du joueur. (+ pour aller à droite.)
            else if (this.scene.cursors.right.isDown || this.DKey.isDown)
            {
                this.setAccelerationX(this.nSpeed/2);
            }
            else if ((this.scene.cursors.left.isUp || this.QKey.isUp) && (this.scene.cursors.right.isUp || this.DKey.isUp)) {
                if (this.body.velocity.x < -0.10) {
                    this.setAccelerationX(this.nSpeed/2*1.5);
                }
                else if (this.body.velocity.x > 0.10){
                    this.setAccelerationX(-this.nSpeed/2*1.5);
                } 
            }
            else
            {
                this.setAccelerationX (0);
            }
        }
        else if (!this.isLifting && this.isCrawling){
            this.setMaxVelocity(100*4,300*4);
            if (this.scene.cursors.left.isDown || this.QKey.isDown)
            {
                this.setAccelerationX(-this.nSpeed/2);
            }
            //Si la touche "flèche droite" est appuyée, on met la véloctiéX du joueur à +la vitesse du joueur. (+ pour aller à droite.)
            else if (this.scene.cursors.right.isDown || this.DKey.isDown)
            {
                this.setAccelerationX(this.nSpeed/2);
            }
            else if ((this.scene.cursors.left.isUp || this.QKey.isUp) && (this.scene.cursors.right.isUp || this.DKey.isUp)) {
                if (this.body.velocity.x < -0.10) {
                    this.setAccelerationX(this.nSpeed/2*1.5);
                }
                else if (this.body.velocity.x > 0.10){
                    this.setAccelerationX(-this.nSpeed/2*1.5);
                } 
            }
            else
            {
                this.setAccelerationX (0);
            }
        }
        else if (this.isLifting && this.isCrawling){
            this.setMaxVelocity(100*4,300*4);
            if (this.scene.cursors.left.isDown || this.QKey.isDown)
            {
                this.setAccelerationX(-this.nSpeed/3);
            }
            //Si la touche "flèche droite" est appuyée, on met la véloctiéX du joueur à +la vitesse du joueur. (+ pour aller à droite.)
            else if (this.scene.cursors.right.isDown || this.DKey.isDown)
            {
                this.setAccelerationX(this.nSpeed/3);
            }
            else if ((this.scene.cursors.left.isUp || this.QKey.isUp) && (this.scene.cursors.right.isUp || this.DKey.isUp)) {
                if (this.body.velocity.x < -0.10) {
                    this.setAccelerationX(this.nSpeed/2*1.5);
                }
                else if (this.body.velocity.x > 0.10){
                    this.setAccelerationX(-this.nSpeed/2*1.5);
                } 
            }
            else
            {
                this.setAccelerationX (0);
            }
        }
/*
        if (this.falling){
            this.isCrawling = false;
        }
*/
        if(inBarbed) {
            this.setMaxVelocity(20*4,300*4);
        }

        if (this.climbingLeft){
            //this.allowGravity(false);
            this.setAccelerationY(-900*4);
            
        }

        if (this.climbingRight){
            //this.allowGravity(false);
            this.setAccelerationY(-900*4);
            

        }
        
        if (this.climbingLeft || this.climbingRight){
            //this.setAccelerationY(0);
        }

        if (!this.isLifting && this.isCrawling){
            this.setBodySize(256,64);
            this.setMaxVelocity(75*4,300*4);
            
        }
        if (!inBarbed){
            
            if(this.isOverlapping && Phaser.Input.Keyboard.JustDown(this.FKey)) {                
                if (!this.body.blocked.left && !this.body.blocked.right){
                    if (!this.isLifting) {
                        this.isLifting = true;

                    }
                    
                }
                
            }
            if (Phaser.Input.Keyboard.JustDown(this.FKey) && this.isLifting){
                this.isLifting = false;
            }
            
        }

        inBarbed = false;


        if (this.body.touching.none && !this.body.wasTouching.none){
            this.falling = true;
        }

        if(this.scene.cursors.right.isDown || this.DKey.isDown) {
            this.direction = 1;
        }
        else if (this.scene.cursors.left.isDown || this.QKey.isDown) {
            this.direction = 0;
        }
    }


    crawl(){
        if (!this.climbingLeft && !this.climbingRight && !this.isLifting){
            if (Phaser.Input.Keyboard.JustDown(this.Ctrl)){
                if (this.isCrawling){
                    this.isCrawling = false;
                    this.anims.play('idle')
                    this.setPosition(this.x,this.y-128);
                }
                else {
                    this.isCrawling = true;
                    this.anims.play('crouch');
                    this.x+=64
                    if(this.scene.cursors.left.isDown || this.QKey.isDown) {
                        this.flipX = true;
                    }
                    else if(this.scene.cursors.right.isDown || this.DKey.isDown) {
                        this.flipX = false;
                    }
                    this.setPosition(this.x,this.y+64);
                    
                }
            }
        }
    }


    climb(){
        if (!this.isCrawling && !this.isLifting){
            if(this.body.blocked.left) { 
                this.climbingLeft = true; 
                this.setMaxVelocity(50*4);
            }
    
            if (this.climbingLeft && !this.body.blocked.left){ 
                this.climbingLeft = false;
                this.setAccelerationY(0);
            }
    
            if(this.body.blocked.right) { 
                this.climbingRight = true; 
                this.setMaxVelocity(50*4);
            }
    
            if (this.climbingRight && !this.body.blocked.right){ 
                this.climbingRight = false;
                this.setAccelerationY(0);
            }
        }
    }

    death() {
        this.scene.scene.restart();
    }
}