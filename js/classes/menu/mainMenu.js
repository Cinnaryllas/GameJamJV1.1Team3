class mainMenu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
        Phaser.Scene.call(this, {key: 'mainMenu'});
    }

    preload ()
    {
        this.load.image("playBtn","../assets/images/playButton.png");
        this.load.image("creditsBtn","../assets/images/creditsButton.png");
    }

    create ()
    {  
        this.playButton = this.add.image(960, 640, "playBtn" );

        this.playButton.setInteractive();

        this.playButton.on('pointerdown', () => this.lvlSelect() );


        this.creditsButton = this.add.image(960, 840, "creditsBtn" );

        this.creditsButton.setInteractive();

        this.creditsButton.on('pointerdown', () => this.credits() );

    }

    update () {}

    lvlSelect()
    {
        this.scene.start("lvlSelect");
    }

    credits()
    {
        this.scene.start("credits");
    }
}