class Verdict extends Phaser.Scene {
    constructor() {
        super({
            key: `verdict`
        });


    }

    create() {

        // Add the sky image as the background
        const sky = this.add.image(0, 0, 'sky').setOrigin(0);
        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2 - 80 , 510, 'avatar').setScale(2.2);
        this.avatar.setBounce(0.2); // Add bounce to the avatar
        this.avatar.setDepth(4);

        // Call the method to create animations for avatar
        this.createAnimations();

        // Display the angel and gates scene with clouds
        this.gates = this.add.image(this.game.config.width / 2, 80, 'gates').setScale(1);
        this.angel = this.add.image(this.game.config.width / 2 + 200 , 380, 'angel').setScale(0.6);
        this.cloudplatform = this.add.image(this.game.config.width / 2 - 150 , 525, 'cloudplatform').setScale(1);


    }



    update() {

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
}


