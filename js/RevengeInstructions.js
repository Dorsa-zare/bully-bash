class RevengeInstructions extends Phaser.Scene {
    constructor() {
        super({
            key: 'revenge instructions'
        });
    }

    create() {
        // Add the school image as the background
        const revengeinstructions = this.add.image(0, 0, 'revenge instructions').setOrigin(0);
        revengeinstructions.setScale(1);

        // Display instructions 
        this.displayInstructions();

        // Display next button 
        this.addButton();


    }

    update() {

    }



    displayInstructions() {
        // Add instructions text
        const instructionsText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, "You've decided not to forgive and take revenge.\nNow, it's time to unleash your power.\nUse your arrow keys to move and push your bullies under the bus.", {
            font: "24px Arial",
            fill: "#000000",
            stroke: "#ffffff",
            strokeThickness: 5,
            align: "center"
        });
        instructionsText.setOrigin(0.5);
        instructionsText.setDepth(5);
    }


    addButton() {
        // Add "Next" button text
        const buttonText = this.add.text(this.game.config.width - 150, this.game.config.height - 50, "Let the revenge begin!", {
            font: "20px Arial",
            fill: "#000000",
            backgroundColor: "#ffffff",
            padding: {
                x: 10,
                y: 5
            },
            align: "center"
        });
        buttonText.setDepth(5);
        buttonText.setOrigin(0.5);
        buttonText.setInteractive(); // Make text clickable
        buttonText.on('pointerdown', () => {
            // Transition to the "revenge" scene
            this.scene.start('revenge');
        });
    }
}
