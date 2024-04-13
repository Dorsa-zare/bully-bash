class SecondChance extends Phaser.Scene {
    constructor() {
        super({
            key: `SecondChance`
        });


    }

    create() {
        // Add the sky image as the background
        const sky = this.add.image(0, 0, 'sky').setOrigin(0);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2 - 100, 450, 'avatar').setScale(3);
        this.avatar.setBounce(0.2); // Add bounce to the avatar
        this.avatar.setDepth(4);

        // Display the angel and gates scene with clouds
        this.angel = this.add.image(this.game.config.width / 2 + 200, 180, 'angel').setScale(0.6);
        this.cloudplatform = this.add.image(this.game.config.width / 2 - 150, 500, 'cloudplatform').setScale(1);

        // Add the "Next" button
        this.addNextButton();
    }

    update() {

    }

    addNextButton() {
        // Add "Next" button text
        const buttonText = this.add.text(this.game.config.width - 70, this.game.config.height - 50, "Next", {
            font: "24px Arial",
            fill: "#ffffff", // White color
            backgroundColor: "#000000",
            padding: {
                x: 10,
                y: 5
            },
            align: "center"
        });
        buttonText.setOrigin(0.5);
        buttonText.setInteractive(); // Make text clickable
        buttonText.on('pointerdown', () => {
            // Transition to the "hell" scene
            this.scene.start('hell');
        });
    }
}