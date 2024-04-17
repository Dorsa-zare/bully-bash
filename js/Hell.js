class Hell extends Phaser.Scene {
    constructor() {
        super({
            key: `hell`
        });
        this.woodsCollected = false; // Flag to indicate woods are not collected
        this.fireSize = 0.4; // Initial size of the fire
        this.originalFireSize = 0.4; // Original size of the fire
        this.minFireSize = 0; // Minimum size of the fire
        this.fireDecreaseRate = this.originalFireSize / 100; // Rate at which the fire size decreases
        this.fireDecreaseDuration = 30000; // Duration for decreasing the fire size (in milliseconds)
        this.fireDecreaseEvent = null; // Phaser timer event for decreasing fire size

    }

    create() {
        // Add the mountain image as the background
        this.mountain = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'mountain').setOrigin(0);
        this.mountain.setScale(1.8); //Scale of the background image

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2);
        this.avatar.setDepth(4);

        // Set up keyboard input for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Enable the camera to follow the avatar
        this.cameras.main.setBounds(0, 0, this.game.config.width * 1.8, this.game.config.height); //Based on mountain scale
        this.cameras.main.startFollow(this.avatar);

        // Display the fire gif
        this.fire = this.physics.add.image(this.game.config.width / 2 - 310, 470, 'fire').setScale(this.fireSize);

        // Start decreasing the fire size over 10 seconds
        this.startDecreaseFireSizeTimer();

        // Display bully
        this.addBully();
        // Initialize bullies array
        this.bullies = [];

        // Display wood
        this.addWood();
        // Initialize woods array
        this.woods = [];

        // Enable collisions between the avatar and woods
        this.physics.add.overlap(this.avatar, this.woodsGroup, this.collectWoods, null, this);

        // Enable collisions between the fire and woods
        this.physics.add.overlap(this.fire, this.woodsGroup, this.handleFireWoodCollision, null, this);

        // Play the hell music
        this.sound.play('hell-music', { loop: true });

    }

    update() {
        // Player movement controls
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(160);
        } else {
            this.avatar.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(160);
        } else {
            this.avatar.setVelocityY(0);
        }
    }

    addBully() {
        //The number of bullies
        const numBullies = 5;

        // Create a group to hold the bullies
        this.bulliesGroup = this.add.group();

        // The positions of the bullies
        const bullyPositions = [
            { x: 170, y: 450 },
            { x: 420, y: 120 },
            { x: 630, y: 330 },
            { x: 850, y: 180 },
            { x: 1370, y: 200 }
        ];

        // Add bullies at the specified positions
        for (let i = 0; i < numBullies; i++) {
            const position = bullyPositions[i];
            const bully = this.physics.add.sprite(position.x, position.y, 'bully');

            // Scale the bully 
            bully.setScale(1.8);

            // Set the depth of the bully sprite to appear behind the avatar
            bully.setDepth(1);

            // Add the bully to the group
            this.bulliesGroup.add(bully);
        }
    }

    addWood() {
        //The number of bullies
        const numWoods = 4;

        // Create a group to hold the bullies
        this.woodsGroup = this.add.group();

        // The positions of the woods
        const woodPositions = [
            { x: 390, y: 180 },
            { x: 680, y: 350 },
            { x: 860, y: 230 },
            { x: 1370, y: 260 }
        ];

        // Add bullies at the specified positions
        for (let i = 0; i < numWoods; i++) {
            const position = woodPositions[i];
            const wood = this.physics.add.sprite(position.x, position.y, 'wood');

            // Scale the bully 
            wood.setScale(0.11);

            // Set the depth of the bully sprite to appear behind the avatar
            wood.setDepth(1);

            // Add the bully to the group
            this.woodsGroup.add(wood);
        }
    }

    // Function to handle the collection of woods
    collectWoods(avatar, wood) {
        // Set the position of the wood sprite to match the avatar's position
        wood.x = avatar.x;
        wood.y = avatar.y + 25;
        wood.setVelocityY(0); // Remove Velocity 
        wood.body.setAllowGravity(false); // Disable gravity for the wood sprite
        wood.setDepth(5);
        // Set flag to indicate that woods are collected
        this.woodsCollected = true;
    }

    // Method to start the timer for decreasing fire size
    startDecreaseFireSizeTimer() {
        this.fireDecreaseEvent = this.time.addEvent({
            delay: this.fireDecreaseDuration / 100, // Decrease size every 1/100th of the duration
            callback: this.decreaseFireSize,
            callbackScope: this,
            repeat: 100, // Repeat 100 times to achieve gradual decrease over 10 seconds
            loop: false // Do not loop the event
        });
    }
    // Method to decrease the size of the fire
    decreaseFireSize() {
        // Decrease fire size gradually
        this.fireSize -= this.fireDecreaseRate;
        this.fire.setScale(this.fireSize);

        // If fire size becomes smaller than minimum size, stop the event
        if (this.fireSize <= this.minFireSize) {
            this.fireSize = this.minFireSize;
            this.fire.setScale(this.fireSize);
            this.fireDecreaseEvent.remove(); // Stop the timer event
        }
    }

    // Method to reset the fire size to its original value
    resetFireSize() {
        this.fireSize = this.originalFireSize;
        this.fire.setScale(this.fireSize);
    }

    // Method to handle collision between fire and wood
    handleFireWoodCollision(fire, wood) {
        // Reset the fire size to its original size
        this.fireSize = this.originalFireSize;
        this.fire.setScale(this.fireSize);

        // Destroy the wood sprite
        wood.destroy();

        // Check if there are no more woods on the screen
        if (this.woodsGroup.countActive() === 0) {
            // Stop the music
            this.sound.stopByKey('hell-music');
            // Transition to the "SecondChance" scene
            this.scene.start('SecondChance');
        }
    }

}