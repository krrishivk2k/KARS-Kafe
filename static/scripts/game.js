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
    
    this.load.image('blackwall', 'static/map/blackwall.png');
    this.load.image('floor', 'static/map/floor.png');
    this.load.image('wall', 'static/map/wall.png');
    this.load.tilemapTiledJSON('wallCollider', 'static/map/wallscollide.tsj');
    this.load.image('furnitures', 'static/map/furnitures.png');
    this.load.image('behind_player', 'static/map/behind_player.png');
    this.load.spritesheet('Chef1Atlas', 'static/characters/Chef1Atlas.png',{ frameWidth: 34, frameHeight: 68 });
    this.load.spritesheet('Chef2Atlas', 'static/characters/Chef2Atlas.png',{ frameWidth: 34, frameHeight: 68 });
    this.load.image('on_top', 'static/map/on_top.png');

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
    platforms = this.physics.add.staticGroup();
    this.add.image(500, 300, 'blackwall');
    this.add.image(500, 300, 'floor');
    platforms.create(500, 300, 'wall').refreshBody();
    platforms.create(500, 300, 'furnitures').refreshBody().setImmovable(true);
    this.add.image(500, 300, 'behind_player');

    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    player = this.physics.add.sprite(450, 350, 'Chef1Atlas');
    player2 = this.physics.add.sprite(350, 350, 'Chef2Atlas');

    
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);

    this.add.image(500, 300, 'on_top');

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
    
    {
        player.setVelocityY(0);
        player.setVelocityX(-75);
        player.anims.play('left1', true);
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