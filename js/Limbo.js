class Limbo extends Phaser.Scene {
    constructor() {
        super({
            key: `limbo`
        });


    }

    create() {
        // Set up physics
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height + 200);
        this.physics.world.gravity.y = 500; // Set gravity

        // Add the graveyard image as the background
        const graveyard = this.add.image(0, this.game.config.height, 'graveyard').setOrigin(0, 0.84);
        graveyard.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2.2);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.setBounce(0.2); // Add bounce to the avatar
        this.avatar.setAlpha(0.5); // Set alpha to 50%
        this.avatar.setTint(0xffffff);
        this.avatar.setDepth(4);

        // Enable physics for the avatar
        this.physics.add.existing(this.avatar);


        
        // Add introductory text
        this.addIntroText();

        // Add "Next" button
        this.addNextButton();

        // Create clouds
        this.createClouds();

        // Call the method to create animations for avatar
        this.createAnimations();

        // Display the avatar sprite
        this.judgement = this.add.image(this.game.config.width / 2, 0, 'judgement').setScale(1);
        this.judgement.setDepth(0);

        // Set up keyboard input for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Initialize the camera's y position
        this.cameraY = this.avatar.y;

         // Play the hell music
         this.sound.play('limbo music', { loop: true });

    }



    update() {
        // Player movement controls
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-160);
            this.avatar.anims.play('avatar-moving', true); // Play animation when moving left
        } else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(160);
            this.avatar.anims.play('avatar-moving', true); // Play animation when moving right
        } else {
            this.avatar.setVelocityX(0);
            this.avatar.anims.stop('avatar-moving'); // Stop animation when not moving
        }

        // Update the camera's y position based on the avatar's movement
        if (this.avatar.body.velocity.y !== 0) {
            this.cameraY = this.avatar.y;
        }

        // Update the camera's position
        this.cameras.main.scrollY = this.cameraY - this.game.config.height / 2;

        // Player jumping functionality
        if (this.input.keyboard.checkDown(this.cursors.up, 250) && this.avatar.body.blocked.down) {
            this.avatar.setVelocityY(-400);
        }
    }

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

    createClouds() {
        // Create a group to hold the clouds
        this.cloudsGroup = this.add.group();
    
        // Y positions for the clouds
        const cloudYPositions = [260, 410, 550, 680];
    
        // The range for cloud movement on the x-axis
        const minX = 100;
        const maxX = 600;
    
        // Fixed speed and duration for cloud movement
        const speed = 200; 
        const duration = 3000; 
    
        // Add clouds with specified y positions
        for (let i = 0; i < cloudYPositions.length; i++) {
    
            let cloud = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), cloudYPositions[i], 'cloud').setImmovable();
            cloud.body.setAllowGravity(false);
            this.cloudsGroup.add(cloud);
            cloud.setScale(0.25);
    
            // Set up cloud movement tween
            this.tweens.add({
                targets: cloud,
                x: Phaser.Math.Between(minX, maxX), 
                duration: duration,
                yoyo: true,
                repeat: -1
            });
    
            // Set up collisions
            this.physics.add.collider(this.avatar, this.cloudsGroup, this.onCloudCollision(this.avatar, cloud));
        }
    }
    
    

    onCloudCollision(avatar, cloud) {
        // Check if the avatar is above the cloud
        if (avatar.body.bottom < cloud.body.top) {
            // Set the avatar's y velocity to 0
            avatar.setVelocityY(0);

            // Adjust the avatar's position to stand on top of the cloud
            avatar.y = cloud.y - avatar.displayHeight / 2;
        }
    }

   addIntroText() {
    // Add intro text
    this.introText = this.add.text(this.game.config.width / 2 - 340, this.game.config.height / 2 + 600, 'You find yourself in Limbo, where lost souls wander until they navigate to the afterlife.', {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#ffffff', 
        align: 'center'
    });
    this.introText.setDepth(10);
}

    addNextButton() {
        // Add "Next" button
        this.nextButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 680, 'Next', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: {
                x: 10,
                y: 5
            }
        });
        this.nextButton.setOrigin(0.5);
        this.nextButton.setInteractive(); // Make the button clickable

        // Set up event for clicking the "Next" button
        this.nextButton.on('pointerdown', this.onNextButtonClick, this);
    }

    onNextButtonClick() {
        // Hide the first text
        this.introText.setVisible(false);
        // Hide the "Next" button
        this.nextButton.setVisible(false);
        // Add the second sentence
        this.addSecondSentence();
    }

    addSecondSentence() {
        // Add the second sentence
        this.secondSentence = this.add.text(this.game.config.width / 2 - 280, this.game.config.height / 2 + 600, 'Use the up arrow to jump and navigate the clouds to reach judgment.', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff',
            align: 'center'
        });
    }

}


