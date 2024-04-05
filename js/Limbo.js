class Limbo extends Phaser.Scene {
    constructor() {
        super({
            key: `limbo`
        });


    }

    create() {
        // Add the sky image as the background
        const sky = this.add.image(0, 0, 'sky').setOrigin(0);
        sky.setScale(1);
    }



    update() {

    }
}



