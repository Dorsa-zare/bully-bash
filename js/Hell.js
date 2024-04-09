class Hell extends Phaser.Scene {
    constructor() {
        super({
            key: `hell`
        });


    }

    create() {

        // Add the sky image as the background
        const sky = this.add.image(0, 0, 'sky').setOrigin(0);
        sky.setScale(1);

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2);
        this.avatar.setBounce(0.2); // Add bounce to the avatar

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


    }

}