class credits extends Phaser.Scene {
    constructor() {
        super("credits");
        Phaser.Scene.call(this, {key: 'credits'});

        this.Space = null;
    }

    preload ()
    {
        this.load.image('credit','../assets/images/credits.png');
        //this.Space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create ()
    {  
        

        this.add.image(0,0,'credit').setOrigin(0,0);

        if (this.Space.isDown){
            this.scene.start("mainMenu");
        }
    }

    update () {}

}