class Hell extends Phaser.Scene {
    constructor() {
        super({
            key: `hell`
        });

        // Initialize bullies array
        this.bullies = [];

    }

    create() {
        // Add the mountain image as the background
        this.mountain = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'mountain').setOrigin(0);
        this.mountain.setScale(1.8); // Set the scale to 1.8 for larger size

        // Display the avatar sprite
        this.avatar = this.physics.add.sprite(this.game.config.width / 2, 510, 'avatar').setScale(2);
        this.avatar.setBounce(0.2); // Add bounce to the avatar

        // Set up keyboard input for player movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Enable the camera to follow the avatar
        this.cameras.main.setBounds(0, 0, this.game.config.width * 1.8, this.game.config.height); // Adjusted bounds based on mountain scale
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
            this.avatar.setVelocityY(-160); // Adjust the velocity as needed
        } else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(160); // Adjust the velocity as needed
        } else {
            this.avatar.setVelocityY(0);
        }
    }
    

    addBully() {
        // Define the number of bully
        const numBully = 8;
        const bullies = []; // Array to store the positions of existing bullies

        for (let i = 0; i < numBully; i++) {
            let x, y;
            let validPosition = false;

            // Repeat until a valid position is found
            while (!validPosition) {
                // Generate random coordinates within the bottom half of the canvas
                x = Phaser.Math.Between(100, this.game.config.width);
                y = Phaser.Math.Between(this.game.config.height / 2 + 60, this.game.config.height);

                // Check if the position conflicts with existing bullies
                let conflicting = false;
                for (const bully of bullies) {
                    if (Phaser.Math.Distance.Between(x, y, bully.x, bully.y) < 100) {
                        conflicting = true;
                        break;
                    }
                }

                // If there's no conflict, set validPosition to true
                if (!conflicting) {
                    validPosition = true;
                }
            }

            // Add bully sprite
            const bully = this.physics.add.sprite(x, y, 'bully');

            // Make bully pushable
            bully.setPushable(true);

            // Scale the bully 
            bully.setScale(1.6);

            // Set the depth of the bully sprite to appear behind the avatar
            bully.setDepth(1);
            // Enable collisions with the world bounds
            bully.setCollideWorldBounds(true);

            // Add the bully to the bullies array
            this.bullies.push(bully);

        }
    }


}