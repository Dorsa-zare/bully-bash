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

        // Display bully
        this.addBully();
        // Initialize bullies array
        this.bullies = [];
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
        const numBullies = 2;
    
        // Create a group to hold the bullies
        this.bulliesGroup = this.add.group();
    
        // The positions of the bullies
        const bullyPositions = [
            { x: 100, y: 300 },
            { x: 600, y: 450 }
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


}