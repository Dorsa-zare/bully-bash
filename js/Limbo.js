class Limbo extends Phaser.Scene {
    constructor() {
        super({
            key: `limbo`
        });


    }

    create() {


        // Set up physics
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.physics.world.gravity.y = 500; // Set gravity

        // Add the graveyard image as the background
        const graveyard = this.add.image(0, 0, 'graveyard').setOrigin(0);
        graveyard.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2.3);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.setBounce(0.2); // Add bounce to the avatar
        this.avatar.setAlpha(0.5); // Set alpha to 50%
        this.avatar.setTint(0xffffff); 

        // Enable physics for the avatar
        this.physics.add.existing(this.avatar);

        // Create clouds
        this.createClouds();

        // Call the method to create animations for avatar
        this.createAnimations();

        // Set up keyboard input for player movement
        this.cursors = this.input.keyboard.createCursorKeys();
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

        // Player jumping functionality
        if (this.input.keyboard.checkDown(this.cursors.up, 250) && this.avatar.body.blocked.down) {
            this.avatar.setVelocityY(-360);
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

        // Define y positions for the clouds
        const cloudYPositions = [150, 260, 380, 510];

        // Add clouds with specified y positions
        for (let i = 0; i < cloudYPositions.length; i++) {

            let cloud = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), cloudYPositions[i], 'cloud').setImmovable();
            cloud.body.setAllowGravity(false);
            this.cloudsGroup.add(cloud);
            cloud.setScale(0.25);

            // Set up cloud movement tween
            this.tweens.add({
                targets: cloud,
                x: Phaser.Math.Between(0, this.game.config.width), // Random destination x-coordinate
                duration: 4000, // Random duration
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

}


