class lvlSelect extends Phaser.Scene {
    constructor() {
        super("lvlSelect");
        Phaser.Scene.call(this, {key: 'lvlSelect'});
    }

    preload ()
    {
        this.load.image("tutorialBtn","../assets/images/tutorialButton.png");
        this.load.image("lvl1Btn","../assets/images/level1Button.png");
        this.load.image("menuBtn","../assets/images/menuButton.png");

    }

    create ()
    {  
        this.tutorialButton = this.add.image(960, 640, "tutorialBtn" );

        this.tutorialButton.setInteractive();

        this.tutorialButton.on('pointerdown', () => this.tutorial() );


        this.level1Button = this.add.image(960, 840, "lvl1Btn" );

        this.level1Button.setInteractive();

        this.level1Button.on('pointerdown', () => this.level1() );


        this.menuButton = this.add.image(200, 100, "menuBtn" );

        this.menuButton.setInteractive();

        this.menuButton.on('pointerdown', () => this.menuReturn() );


    }

    update () {}

    menuReturn()
    {
        this.scene.start("mainMenu");
    }

    tutorial()
    {
        this.scene.start("tutorial");
    }

    level1()
    {
        this.scene.start("firstLevel");
    }
}