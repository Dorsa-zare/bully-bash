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
        this.avatar = this.physics.add.sprite(this.game.config.width / 2 - 80, 510, 'avatar').setScale(2.4);
        this.avatar.setBounce(0.2); // Add bounce to the avatar
        this.avatar.setDepth(4);

        // Call the method to create animations for avatar
        this.createAnimations();

        // Display the angel and gates scene with clouds
        this.gates = this.add.image(this.game.config.width / 2, 80, 'gates').setScale(1);
        this.angel = this.add.image(this.game.config.width / 2 + 200, 380, 'angel').setScale(0.6);
        this.cloudplatform = this.add.image(this.game.config.width / 2 - 150, 525, 'cloudplatform').setScale(1);

        // Create a group for bullies
        this.bulliesGroup = this.physics.add.group();

        // Add bullies to the group with specific positions
        this.addBullies();

        // Display dialogue bubbles
        this.displayDialogue();
    }

    addBullies() {
        // Positions for bullies
        const bullyPositions = [
            { x: 80, y: 510 },
            { x: 130, y: 500 },
            { x: 170, y: 510 },
            { x: 100, y: 530 },
            { x: 140, y: 530 },
        ];

        // Add bullies to the group at specified positions
        bullyPositions.forEach(position => {
            const bully = this.bulliesGroup.create(position.x, position.y, 'bully').setScale(2); // Set scale for each bully
        });
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

    displayDialogue() {
        // Delayed function to display dialogue bubbles
        this.time.delayedCall(2000, () => {
            this.showDialogue("So, what's the verdict?", this.game.config.width / 2 - 200, this.game.config.height / 2 + 100);
        }, [], this);
    
        this.time.delayedCall(4000, () => {
            this.showDialogue("Yall are going to hell for sure.", this.game.config.width / 2 + 50, this.game.config.height / 2);
        }, [], this);
    
        this.time.delayedCall(7000, () => {
            this.showDialogue("But why me?", this.game.config.width / 2 - 200, this.game.config.height / 2 + 100);
        }, [], this);
    
        this.time.delayedCall(9000, () => {
            this.showDialogue("Are you being for real?\nYou mass-murdered people!", this.game.config.width / 2 + 50, this.game.config.height / 2 );
        }, [], this);

        this.time.delayedCall(12000, () => {
            this.showDialogue("Hell with my bullies?\nSounds like a blast.", this.game.config.width / 2 - 200, this.game.config.height / 2 + 100);
        }, [], this);
    }
    

    showDialogue(text, posX, posY) {
        // Create a dialogue bubble
        const bubble = this.add.image(posX, posY, 'dialogueBubble').setScale(0.4);
    
        // Add text to the dialogue bubble
        const bubbleText = this.add.text(bubble.x - 100, bubble.y - 20, text, { font: "16px Arial", fill: "#000" });
    }
    

}


