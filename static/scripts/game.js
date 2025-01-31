var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade:{
            allowGravity: false,
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};


var game = new Phaser.Game(config);

function preload ()
{
    
    this.load.image('sky', 'static/sky.png');
    this.load.spritesheet('Chef1Atlas', 'static/characters/Chef1Atlas.png',{ frameWidth: 34, frameHeight: 68 });
    this.load.spritesheet('Chef2Atlas', 'static/characters/Chef2Atlas.png',{ frameWidth: 34, frameHeight: 68 });

    let keyA;
    let keyD;
    let keyW;
    let keyS;

    var cursors;
    var player;
    var player2;

}

function create ()
{
    this.add.image(400, 300, 'sky');

    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    player = this.physics.add.sprite(400, 300, 'Chef1Atlas');
    player2 = this.physics.add.sprite(200, 300, 'Chef2Atlas');

    //chef1 animation
    this.anims.create({
        key: 'left1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 99, end: 103 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 123, end: 126}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 127, end: 132 }),
        frameRate: 10,
        repeat: -1
        
    });
    this.anims.create({
        key: 'down1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 93, end: 98 }),
        frameRate: 10,
        repeat: -1
    });

    //chef2 animation
    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down2',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
}

function update ()
{
    
    if (cursors.left.isDown)
    {
        player.setVelocityY(0);
        player.setVelocityX(-75);
        player.anims.play('left1', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityY(0);
        player.setVelocityX(75);
        player.anims.play('right1', true);
    }

    else if (cursors.up.isDown)
    {
        player.setVelocityX(0);
        player.setVelocityY(-75);
        player.anims.play('up1', true);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityX(0);
        player.setVelocityY(75);
        player.anims.play('down1', true);
    }


    if(keyA.isDown){
        console.log('A');
    }
    else if(keyS.isDown){
        console.log('S');
    }
    else if(keyD.isDown){
        console.log('D');
    }
    else if(keyW.isDown){
        console.log('W');
    }
        
}