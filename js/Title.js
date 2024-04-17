class Title extends Phaser.Scene {
    constructor() {
        super({
            key: `title`
        });
    }

    create() {
        // Add the rainbow image as the background
        const rainbow = this.add.image(0, 0, 'title image').setOrigin(0);
        rainbow.setScale(1);


        // Display the 'start' image in the middle of the screen
        const startImage = this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 40, 'start').setInteractive();
        startImage.setScale(0.4);

        // Listen for pointer down event on the 'start' image
        startImage.on('pointerdown', () => {
            // Change scene to the bullying scene
            this.scene.start('bullying instructions');
        });


        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 450, `avatar`);
        this.avatar.setScale(3);
        this.avatar.setDepth(3);

        // Call the method to create animations for avatar
        this.createAnimations();

    }


    update() {
        this.avatar.anims.play('avatar-moving', true);
    }


    createAnimations() {
        // Animation properties for the avatar
        this.anims.create({
            key: `avatar-moving`,
            frames: this.anims.generateFrameNumbers(`avatar`, {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    }

}
