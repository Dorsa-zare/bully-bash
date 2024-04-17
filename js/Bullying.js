class Bullying extends Phaser.Scene {
    constructor() {
        super({
            key: `bullying`
        });
        this.headphonesCollected = false; // Flag to indicate headphones are not collected

    }

    create() {
        // Add the school image as the background
        const school = this.add.image(0, 0, 'school').setOrigin(0);
        school.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 530, `avatar`);
        this.avatar.setScale(2.5);
        this.avatar.setDepth(3);

        // Define cursors for keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set bounds for the avatar to stay within the canvas
        this.avatar.setCollideWorldBounds(true);

        // Add the bully image at the top of the screen
        const bullyImage = this.add.image(this.game.config.width / 2, 15, 'bully');
        bullyImage.setScale(2.7);
        this.avatar.setDepth(4);
        bullyImage.setAngle(180); // Rotate the image 180 degrees

        // Create bully words
        this.bullyWords = this.physics.add.group();

        // Generate bully words and repeat
        this.timerEvent = this.time.addEvent({
            delay: 1000, // Generate bully words every second
            callback: this.generateBullyWords,
            callbackScope: this,
            repeat: 20 // Repeat the event 20 times 
        });

        // Set collision detection between avatar and canvas bounds
        this.physics.world.setBoundsCollision(true, true, true, false);

        // Create heart group
        this.heartsGroup = this.add.group();

        // Generate hearts
        this.generateHearts();

        // Flag to track if heart is visible
        this.heartVisible = false;

        // Enable collisions between the avatar and bully words
        this.physics.add.overlap(this.avatar, this.bullyWords, this.showHeartImage, null, this);

        // Timer for checking if heart is visible after 25 seconds
        this.checkHeartTimer = this.time.addEvent({
            delay: 25000, // 25 seconds
            callback: this.checkHeartVisibility,
            callbackScope: this
        });

        this.headphonesGroup = this.physics.add.group();
        this.timerEvent = this.time.addEvent({
            delay: 7000, // 7 seconds
            callback: this.generateHeadphones,
            callbackScope: this,
        });

        // Enable collisions between the avatar and headphones
        this.physics.add.overlap(this.avatar, this.headphonesGroup, this.collectHeadphones, null, this);

    }

    update() {
        // Movement controls for the avatar
        this.avatar.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(300);
        }
    }

    generateBullyWords() {
        // Create bully words with text
        const bullyPhrases = ['Ugly', 'Dumb', 'Loser', 'Weirdo', 'Freak', 'Nerd'];

        // Get the next bully word
        const nextBullyWord = bullyPhrases[this.bullyWordIndex];

        // If there are still words in the array
        if (nextBullyWord !== undefined) {
            const randomX = Phaser.Math.Between(50, 700);

            // Create a bully word
            const bullyWord = this.add.text(randomX, 0, nextBullyWord, {
                font: "24px Arial",
                fill: "#ff0000", // Red color
                stroke: "#000000", // Black outline
                strokeThickness: 3 // Thickness of the outline
            });

            // Add the bully word to the group
            this.bullyWords.add(bullyWord);
            // Set initial y position for the bully word
            bullyWord.y = -100; // Start above the canvas
            // Enable physics for the bully word
            this.physics.world.enable(bullyWord);
            // Set gravity for the bully word
            bullyWord.body.setGravityY(150);
            // Increase the index for the next word
            this.bullyWordIndex++;
        } else {
            // Reset the index to start from the beginning
            this.bullyWordIndex = 0;
        }
    }

    generateHearts() {
        // Create three hearts with a vertical gap of 50 pixels
        for (let i = 0; i < 10; i++) {
            const heart = this.add.image(this.game.config.width - 50, 40 + i * 50, 'heart');
            heart.setScale(0.08);
            this.heartsGroup.add(heart);
            heart.setActive(false); // Initially hide the hearts
            heart.visible = false;
        }
    }

    showHeartImage(avatar, word) {
        // Check if the headphones are not collected
        if (!this.headphonesCollected) {
            // Play the collision sound effect
            this.sound.play('boom', { volume: 0.2 });

            // Show the hearts when the avatar collides with a bully word
            let heart = this.heartsGroup.getFirstDead()
            heart.setActive(true);
            heart.visible = true;
        }
        // Destroy the bully word
        word.destroy();
    }



    generateHeadphones() {
        const x = Phaser.Math.Between(50, 700);
        const headphones = this.headphonesGroup.create(x, 0, 'headphones');
        headphones.setScale(0.15);
        headphones.setVelocityY(50); //Velocity to make headphones fall
        headphones.setGravityY(200); // Apply gravity to the headphones
        this.headphonesGroup.setDepth(5);
    }

    collectHeadphones(avatar, headphones) {
        // Set the position of the headphones to match the avatar's position
        headphones.setPosition(avatar.x, 500);
        headphones.setScale(0.2);
        headphones.setVelocityY(0); // Remove Velocity 
        headphones.setGravityY(0); // Remove gravity to the headphones

        // Set flag to indicate that headphones are collected
        this.headphonesCollected = true;

        // Reduce the opacity of the bully words
        this.bullyWords.getChildren().forEach((bullyWord) => {
            bullyWord.setAlpha(0.6); //Opacity
        });

        // Check if the music is not already playing
        if (!this.musicPlaying) {
            // Play the collision sound
            this.sound.play('music');
            // Set the flag to indicate that music is playing
            this.musicPlaying = true;
        }
    }


    // Check if heart is visible after 20 seconds
    checkHeartVisibility() {
        let heartVisible = false;
    
        // Check if any heart is visible
        this.heartsGroup.getChildren().forEach((heart) => {
            if (heart.visible) {
                heartVisible = true;
            }
        });
    
        // Create a semi-transparent white window
        const windowGraphics = this.add.graphics();
        windowGraphics.fillStyle(0xffffff, 0.5); // White color with 50% opacity
        windowGraphics.fillRect(150, 100, 500, 250); // Position and size of the window
    
        if (heartVisible) {
            // Display text indicating the heart has been broken
            this.brokenHeartText = this.add.text(this.game.config.width / 2, 220, "Your heart has been broken by the bullies.\nYou will have the chance to get revenge now.", {
                font: "20px Arial",
                fill: "#000000",
                align: "center"
            });
            this.brokenHeartText.setOrigin(0.5);
        } else {
            // Display text indicating that you tried to ignore the bullies
            this.ignoredBulliesText = this.add.text(this.game.config.width / 2, 200, "You tried to ignore what they said about you,\nBut, you are still hurt deep down. \nNow you will have the chance to get revenge!", {
                font: "18px Arial",
                fill: "#000000",
                align: "center"
            });
            this.ignoredBulliesText.setOrigin(0.5);
        }
    
        // Add clickable text options
        this.addClickableText();
    }
    
    


    // Add clickable text options
    addClickableText() {
        // Add "Get Revenge" text
        const getRevengeText = this.add.text(this.game.config.width / 2 + 100, 300, "Get Revenge", {
            font: "20px Arial",
            fill: "#ffffff", // White color
            backgroundColor: "#000000",
            padding: {
                x: 20,
                y: 10
            },
            align: "center"
        });
        getRevengeText.setOrigin(0.5);
        getRevengeText.setInteractive(); // Make text clickable
        getRevengeText.on('pointerdown', () => {
            // Transition to the play scene
            this.scene.start('revenge instructions');
        });

        // Add "Forgive" text
        const forgiveText = this.add.text(this.game.config.width / 2 - 100, 300, "Forgive", {
            font: "20px Arial",
            fill: "#ffffff", // White color
            backgroundColor: "#000000",
            padding: {
                x: 20,
                y: 10
            },
            align: "center"
        });
        forgiveText.setOrigin(0.5);
        forgiveText.setInteractive(); // Make text clickable
        forgiveText.on('pointerdown', () => {
            // Transition to the Forgiveness scene
            this.scene.start('forgiveness');
        });
    }
}
