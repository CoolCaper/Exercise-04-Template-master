class Overworld extends Phaser.Scene {
    constructor() {
        super('overworldScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')
    }

    create() {
        // velocity constant
        this.VEL = 100
        // tilemap set up
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const background = map.createLayer('background', 'tileset', 0, 0)
        const trees = map.createLayer('trees', 'tileset', 0, 0)
        const terrain = map.createLayer('terrain', 'tileset', 0, 0)
        // add slime
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.slime = this.physics.add.sprite(200, 200, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)
        trees.setCollisionByProperty({
            collides:true
        })
        terrain.setCollisionByProperty({
            collides:true
        })
        this.physics.add.collider(this.slime, trees)
        this.physics.add.collider(this.slime, terrain)

        // slime animation
        this.slime.anims.create({
            key: 'jiggle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 1
            })
        })
        this.slime.anims.play('jiggle');
        //cameras
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        //terrain collision
        // input
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        // slime movement
        console.log(this.slime.x)
        //this.slime.x = 200;
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }
        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}