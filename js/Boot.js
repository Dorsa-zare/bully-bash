class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        // Load avatar image
        this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 5
        });
        // Load red avatar image
        this.load.spritesheet(`redavatar`, `assets/images/redavatar.png`, {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 9
        });

        // Load school image
        this.load.image(`school`, `assets/images/school.png`);
        // Load broken heart image
        this.load.image(`heart`, `assets/images/heart.png`);
        // Load headphones image
        this.load.image(`headphones`, `assets/images/headphone.png`);
        // Load the audio file
        this.load.audio('music', 'assets/sounds/music.mp3');
        // Load the boom sound effect file
        this.load.audio('boom', 'assets/sounds/boom.mp3');
        // Load street image
        this.load.image(`street`, `assets/images/street.png`);
        // Load car image
        this.load.image(`bus`, `assets/images/bus.png`);
        // Load bully image
        this.load.image(`bully`, `assets/images/bully.png`);
        // Load the sound effect for bullies (yaaa)
        this.load.audio('yaaa', 'assets/sounds/yaaa.mp3');
        // Load the sound effect for bullies (singing)
        this.load.audio('bullyvoice', 'assets/sounds/bullyvoice.mp3');
        // Load flower image
        this.load.image(`flower`, `assets/images/flower.png`);
        // Load karma bus image
        this.load.image(`karma`, `assets/images/karma.png`);
        // Load rainbow image
        this.load.image(`rainbow`, `assets/images/rainbow.png`);
        // Load the graveyard image for Limbo scene
        this.load.image(`graveyard`, `assets/images/graveyard.png`);
        // Load the cloud image for Limbo scene
        this.load.image(`cloud`, `assets/images/cloud.png`);
        // Load the judgement image for Limbo scene
        this.load.image(`judgement`, `assets/images/judgement.png`);
        // Load the sky image for verdict scene
        this.load.image(`sky`, `assets/images/sky.png`);
        // Load the angel image for verdict scene
        this.load.image(`angel`, `assets/images/angel.png`);
        // Load the gates image for verdict scene
        this.load.image(`gates`, `assets/images/gates.png`);
        // Load the cloud platform image for verdict scene
        this.load.image(`cloudplatform`, `assets/images/cloudplatform.png`);
        // Load the dialogueBubble image for verdict scene
        this.load.image(`dialogueBubble`, `assets/images/dialogueBubble.png`);

        // Load the mountain image for hell scene
        this.load.image(`mountain`, `assets/images/mountain.gif`);
        // Load the wood image for hell scene
        this.load.image(`wood`, `assets/images/wood.png`);
        // Load the fire image for hell scene
        this.load.image(`fire`, `assets/images/fire.gif`);
        // Load the audio file
        this.load.audio('hell music', 'assets/sounds/hellmusic.mp3');

        this.load.on(`complete`, () => {
            this.scene.start(`revenge`);
        });
    }

    create() {

    }

    update() {

    }
}