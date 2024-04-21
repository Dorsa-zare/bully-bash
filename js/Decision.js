class Decision extends Phaser.Scene {
    constructor() {
        super({
            key: `decision`
        });
    }

    create() {
        // Add the school image as the background
        const school = this.add.image(0, 0, 'school').setOrigin(0);
        school.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 530, `avatar`);
        this.avatar.setScale(2.5);
        this.avatar.setDepth(3);


        // Add the bully image at the top of the screen
        const bullyImage = this.add.image(this.game.config.width / 2, 15, 'bully');
        bullyImage.setScale(2.7);
        this.avatar.setDepth(4);
        bullyImage.setAngle(180); // Rotate the image 180 degrees

        this.DisplayText();
        this.addClickableText();
    }


    DisplayText() {
        // Create a semi-transparent white window
        const windowGraphics = this.add.graphics();
        windowGraphics.fillStyle(0xffffff, 0.5); // White color with 50% opacity
        windowGraphics.fillRect(150, 100, 500, 250); // Position and size of the window


        // Display text indicating the heart has been broken
        this.brokenHeartText = this.add.text(this.game.config.width / 2, 220, "Your heart has been broken by the bullies.\nYou will have the chance to forgive them or get revenge.", {
            font: "20px Arial",
            fill: "#000000",
            align: "center"
        });
        this.brokenHeartText.setOrigin(0.5);

        // Display text indicating the heart has been broken
        this.secondChanceText = this.add.text(this.game.config.width / 2, 120, " Second Chance", {
            font: "35px Arial",
            fill: "#000000",
            align: "center"
        });
        this.secondChanceText.setOrigin(0.5);
    }



    // Add clickable text options
    addClickableText() {
        // Add "Get Revenge" text
        const getRevengeText = this.add.text(this.game.config.width / 2 + 100, 320, "Get Revenge", {
            font: "20px Arial",
            fill: "#ffffff", // Red color
            stroke: "#000000", // Black outline
            strokeThickness: 20,// Thickness of the outline
            align: "center"
        });
        getRevengeText.setOrigin(0.5);
        getRevengeText.setInteractive(); // Make text clickable
        getRevengeText.on('pointerdown', () => {
            this.sound.stopAll();
            // Transition to the play scene
            this.scene.start('revenge-instructions');
        });

        // Add "Forgive" text
        const forgiveText = this.add.text(this.game.config.width / 2 - 100, 320, "Forgive", {
            font: "20px Arial",
            fill: "#ffffff", // Red color
            stroke: "#000000", // Black outline
            strokeThickness: 20,// Thickness of the outline
            align: "center"
        });
        forgiveText.setOrigin(0.5);
        forgiveText.setInteractive(); // Make text clickable
        forgiveText.on('pointerdown', () => {
            // this.sound.stopAll();
            // Transition to the Forgiveness scene
            this.scene.start('forgiveness');
        });
    }

}
