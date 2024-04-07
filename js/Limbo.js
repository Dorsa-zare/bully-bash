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
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2).setDepth(3);
        this.avatar.setCollideWorldBounds(true);

        // Create clouds
        this.createClouds();

        // Set up keyboard input for player movement
        this.cursors = this.input.keyboard.createCursorKeys();
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
            this.avatar.setVelocityY(-330);
        }

        // Collision detection between avatar and clouds
        this.physics.world.collide(this.avatar, this.cloudsGroup);
    }

    createClouds() {
        // Create a group to hold the clouds
        this.cloudsGroup = this.add.group();

        // Define y positions for the clouds
        const cloudYPositions = [50, 150, 250, 350, 420, 505];

        // Add clouds with specified y positions
        for (let i = 0; i < cloudYPositions.length; i++) {
            // Create a cloud sprite and add it to the group
            let cloud = this.add.sprite(Phaser.Math.Between(0, this.game.config.width), cloudYPositions[i], 'cloud');
            this.cloudsGroup.add(cloud);
            cloud.setScale(0.25);

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
}


