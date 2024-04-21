class HellInstructions extends Phaser.Scene {
    constructor() {
        super({
            key: 'hell-instructions'
        });
    }

    create() {
        // Add the mountain image as the background
        this.mountain = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'mountain').setOrigin(0);
        this.mountain.setScale(1.8); //Scale of the background image

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2);
        this.avatar.setDepth(4);

        // Display the fire gif
        this.fire = this.physics.add.image(this.game.config.width / 2 - 310, 470, 'fire').setScale(0.4);

        // Display bully
        this.addBully();
        // Initialize bullies array
        this.bullies = [];

        // Display wood
        this.addWood();
        // Initialize woods array
        this.woods = [];

        // Display instructions 
        this.displayInstructions();
        this.displayTitleText();

        // Display next button 
        this.addButton();


    }

    update() {

    }


    displayTitleText() {
        const titleText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 250, "Welcome to hell!", {
            font: "30px Arial",
            fill: "#000000",
            stroke: "#ff0000",
            strokeThickness: 2,
            align: "center"
        });
        titleText.setOrigin(0.5);
        titleText.setDepth(5);
    }

    displayInstructions() {
        // Add semi-transparent black background
        const backgroundRect = this.add.graphics();
        backgroundRect.fillStyle(0x000000, 0.5); // Black color with 50% opacity
        backgroundRect.fillRect(0, this.game.config.height / 2 - 150, this.game.config.width, 250); // Position and size of the rectangle

        // Add instructions text
        const instructionsText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 50, "You and your bullies must work together\nto keep the flames burning bright.\nYour job is to gather wood logs and feed them\nto the fire to keep it going.", {
            font: "24px Arial",
            fill: "#FFFFFF",
            stroke: "#000000",
            strokeThickness: 2,
            align: "center"
        });

        // Add last sentence text without background
        const lastSentenceText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, "If you perform well, you might be granted a second chance.", {
            font: "18px Arial",
            fill: "#FFFFFF",
            stroke: "#000000",
            strokeThickness: 2,
            align: "center"
        });

        instructionsText.setOrigin(0.5);
        lastSentenceText.setOrigin(0.5);
        instructionsText.setDepth(5);
        lastSentenceText.setDepth(5);
    }


    addButton() {
        // Add "Next" button text
        const buttonText = this.add.text(this.game.config.width - 150, this.game.config.height - 100, "Next", {
            font: "24px Arial",
            fill: "#000000", // white color
            stroke: "#ffffff", // Black outline
            strokeThickness: 20,// Thickness of the outline
            align: "center"
        });
        buttonText.setDepth(5);
        buttonText.setOrigin(0.5);
        buttonText.setInteractive(); // Make text clickable
        buttonText.on('pointerdown', () => {
            // Transition to the "revenge" scene
            this.scene.start('hell');
        });
    }

    addBully() {
        //The number of bullies
        const numBullies = 2;

        // Create a group to hold the bullies
        this.bulliesGroup = this.add.group();

        // The positions of the bullies
        const bullyPositions = [
            { x: 170, y: 450 },
            { x: 420, y: 120 }
        ];

        // Add bullies at the specified positions
        for (let i = 0; i < numBullies; i++) {
            const position = bullyPositions[i];
            const bully = this.physics.add.sprite(position.x, position.y, 'bully');

            // Scale the bully 
            bully.setScale(1.8);
            bully.setDepth(0);

            // Add the bully to the group
            this.bulliesGroup.add(bully);
        }
    }

    addWood() {
        //The number of bullies
        const numWoods = 2;

        // Create a group to hold the bullies
        this.woodsGroup = this.add.group();

        // The positions of the woods
        const woodPositions = [
            { x: 390, y: 180 },
            { x: 680, y: 350 }
        ];

        // Add bullies at the specified positions
        for (let i = 0; i < numWoods; i++) {
            const position = woodPositions[i];
            const wood = this.physics.add.sprite(position.x, position.y, 'wood');

            // Scale the bully 
            wood.setScale(0.11);
            wood.setDepth(0);

            // Add the bully to the group
            this.woodsGroup.add(wood);
        }
    }

}
