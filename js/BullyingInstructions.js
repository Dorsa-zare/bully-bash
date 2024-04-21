class BullyingInstructions extends Phaser.Scene {
    constructor() {
        super({
            key: 'bullying-instructions'
        });
        this.step = 1; // Track the current step of instructions
    }

    create() {
        // Add the school image as the background
        const school = this.add.image(0, 0, 'school').setOrigin(0);
        school.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 530, 'avatar');
        this.avatar.setScale(2.5);
        this.avatar.setDepth(3);

        // Display instructions 
        this.displayInstructions();

        // Display next button 
        this.addNextButton();
    }

    update() {

    }



    displayInstructions() {
        // Display first instructions image
        this.instructionsImage1 = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 90, 'instructions1').setOrigin(0.5).setDepth(4);
        this.instructionsImage1.setScale(0.6);

        // Display second instructions image (hidden initially)
        this.instructionsImage2 = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 70, 'instructions2').setOrigin(0.5).setDepth(5);
        this.instructionsImage2.setScale(0.6);
        this.instructionsImage2.setVisible(false); // Hide the second image initially
    }

    addNextButton() {
        // Add "Next" button text
        const buttonText = this.add.text(this.game.config.width - 220, this.game.config.height - 180, "Next", {
            font: "30px Arial",
            fill: "#ffffff", // white color
            stroke: "#000000", // Black outline
            strokeThickness: 15,// Thickness of the outline
            align: "center"
        });
        buttonText.setOrigin(0.5);
        buttonText.setInteractive(); // Make text clickable
        buttonText.on('pointerdown', () => {
            // Increment step and update instructions
            this.step++;
            if (this.step === 2) {
                // Display second instructions image
                this.instructionsImage1.setVisible(false);
                this.instructionsImage2.setVisible(true);
            } else if (this.step === 3) {
                // Transition to the "bullying" scene
                this.scene.start('bullying');
            }
        });
    }
}
