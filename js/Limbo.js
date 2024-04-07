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

        // Add the sky image as the background
        const sky = this.add.image(0, 0, 'sky').setOrigin(0);
        sky.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.setBounce(0.2); // Add bounce to the avatar

        // Enable physics for the avatar
        this.physics.add.existing(this.avatar);

        // Create clouds
        this.createClouds();

        // Set up keyboard input for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set up collisions
        this.physics.add.collider(this.avatar, this.cloudsGroup, this.onCloudCollision, null, this);
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

        // Player jumping functionality
        if (this.input.keyboard.checkDown(this.cursors.up, 250) && this.avatar.body.blocked.down) {
            this.avatar.setVelocityY(-360);
        }
    }

    createClouds() {
        // Create a group to hold the clouds
        this.cloudsGroup = this.add.group();

        // Define y positions for the clouds
        const cloudYPositions = [50, 150, 250, 350, 420, 540];

        // Add clouds with specified y positions
        for (let i = 0; i < cloudYPositions.length; i++) {
            // Create a cloud sprite and add it to the group
            let cloud = this.add.sprite(Phaser.Math.Between(0, this.game.config.width), cloudYPositions[i], 'cloud');
            this.cloudsGroup.add(cloud);
            cloud.setScale(0.20);

            // Set up cloud movement tween
            this.tweens.add({
                targets: cloud,
                x: Phaser.Math.Between(0, this.game.config.width), // Random destination x-coordinate
                duration: Phaser.Math.Between(2000, 5000), // Random duration
                yoyo: true,
                repeat: -1
            });
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


