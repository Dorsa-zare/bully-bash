class Hell extends Phaser.Scene {
    constructor() {
        super({
            key: `hell`
        });

    }

    create() {
        // Add the mountain image as the background
        this.mountain = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'mountain').setOrigin(0);
        this.mountain.setScale(1.8); //Scale of the background image

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2);

        // Set up keyboard input for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Enable the camera to follow the avatar
        this.cameras.main.setBounds(0, 0, this.game.config.width * 1.8, this.game.config.height); //Based on mountain scale
        this.cameras.main.startFollow(this.avatar);

        // Display the fire gif
        this.fire = this.add.image(this.game.config.width / 2 - 310, 470, 'fire').setScale(0.4);

        // Display bully
        this.addBully();
        // Initialize bullies array
        this.bullies = [];

        // Display wood
        this.addWood();
        // Initialize woods array
        this.woods = [];

        // Play the hell music
        this.sound.play('hell music', { loop: true });
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

        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(160);
        } else {
            this.avatar.setVelocityY(0);
        }
    }

    addBully() {
        //The number of bullies
        const numBullies = 5;

        // Create a group to hold the bullies
        this.bulliesGroup = this.add.group();

        // The positions of the bullies
        const bullyPositions = [
            { x: 170, y: 450 },
            { x: 420, y: 120 },
            { x: 630, y: 330 },
            { x: 850, y: 180 },
            { x: 1370, y: 200 }
        ];
        
        // Add bullies at the specified positions
        for (let i = 0; i < numBullies; i++) {
            const position = bullyPositions[i];
            const bully = this.physics.add.sprite(position.x, position.y, 'bully');

            // Scale the bully 
            bully.setScale(1.8);

            // Set the depth of the bully sprite to appear behind the avatar
            bully.setDepth(1);

            // Add the bully to the group
            this.bulliesGroup.add(bully);
        }
    }
    
    addWood() {
        //The number of bullies
        const numWoods = 4;

        // Create a group to hold the bullies
        this.woodsGroup = this.add.group();

        // The positions of the woods
        const woodPositions = [
            { x: 390, y: 180 },
            { x: 680, y: 350 },
            { x: 860, y: 230 },
            { x: 1370, y: 260 }
        ];
        
        // Add bullies at the specified positions
        for (let i = 0; i < numWoods; i++) {
            const position = woodPositions[i];
            const wood = this.physics.add.sprite(position.x, position.y, 'wood');

            // Scale the bully 
            wood.setScale(0.11);

            // Set the depth of the bully sprite to appear behind the avatar
            wood.setDepth(1);

            // Add the bully to the group
            this.woodsGroup.add(wood);
        }
    }


}