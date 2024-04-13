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

        // Call the method to create animations for avatar
        this.createAnimations();

        // Start playing the animation for the avatar
        this.avatar.play('avatar-moving');

        // Display the angel and gates scene with clouds
        this.angel = this.add.image(this.game.config.width / 2 + 200, 250, 'angel').setScale(0.6);
        this.cloudplatform = this.add.image(this.game.config.width / 2 - 150, 500, 'cloudplatform').setScale(1);

        // Display the text
        this.displayText();

        // Add the "Next" button
        this.displayNextButton();
    }

    update() { }

    createAnimations() {
        // Animation properties for the avatar
        this.anims.create({
            key: `avatar-moving`,
            frames: this.anims.generateFrameNumbers(`avatar`, {
                start: 0,
                end: 3
            }),
            frameRate: 12,
            repeat: -1
        });
    }

    displayText() {
        // Add the first sentence
        const text = this.add.text(50, 70, "", {
            font: "22px Arial",
            fill: "#000000", // Black color
            wordWrap: { width: 700, useAdvancedWrap: true }
        });

        // Add each subsequent sentence after a delay of 2 seconds
        this.time.delayedCall(1000, () => {
            text.text += "You've been a real trooper during your time in Hell,\n";
        });

        this.time.delayedCall(3000, () => {
            text.text += "and you've shown excellent cooperation with your bullies.\n";
        });

        this.time.delayedCall(4000, () => {
            text.text += "\nSo guess what?\n";
        });

        this.time.delayedCall(6000, () => {
            text.text += "\nWe're giving you a second chance!";
        });
    }



    displayNextButton() {
        // Add "Next" button text
        const buttonText = this.add.text(this.game.config.width - 80, this.game.config.height - 60, "Next", {
            font: "30px Arial",
            fill: "#000000", // Black color
            backgroundColor: "#ffffff",
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
            this.scene.start('bullying');
        });
    }
}
