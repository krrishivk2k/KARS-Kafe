

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade:{
            allowGravity: false,
            debug: false,
            fps: 120
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
    this.load.image('furnitures', 'static/map/furnitures.png');
    this.load.image('behind_player', 'static/map/behind_player.png');
    this.load.image('wall', 'static/map/wall.png');
    this.load.image('boundary', 'static/map/tile.png');
    this.load.image('interaction', 'static/map/interaction.png');
    this.load.tilemapTiledJSON('wallCollider', 'static/map/wallscollide.JSON');
    this.load.spritesheet('Chef1Atlas', 'static/characters/Chef1Atlas.png',{ frameWidth: 34, frameHeight: 66 });
    this.load.spritesheet('Chef2Atlas', 'static/characters/Chef2Atlas.png',{ frameWidth: 34, frameHeight: 68 });
    this.load.image('on_top', 'static/map/on_top.png');

    //Player 2 Keys
    let keyA;
    let keyD;
    let keyW;
    let keyS;
    
    //Player 1 Keys

    var keyControl
    var player;
    var player2;

}

function create ()
{
    boundaries = this.physics.add.staticGroup();
    interactionsK = this.physics.add.staticGroup();
    interactionsP = this.physics.add.staticGroup();

    this.add.image(500, 300, 'blackwall'); 

    
    //Creating Kitchen boundaries
    // createKitchenBoundaries(boundaries);

    boundaries.create(288,96,'boundary').refreshBody();
    boundaries.create(288,128,'boundary').refreshBody();
    boundaries.create(288,160,'boundary').refreshBody();
    boundaries.create(288,192,'boundary').refreshBody();
    boundaries.create(288,224,'boundary').refreshBody();
    boundaries.create(288,256,'boundary').refreshBody();
    boundaries.create(320,256,'boundary').refreshBody();
    boundaries.create(352,256,'boundary').refreshBody();
    boundaries.create(384,256,'boundary').refreshBody();
    boundaries.create(486,256,'boundary').refreshBody();
    boundaries.create(512,256,'boundary').refreshBody();
    boundaries.create(544,256,'boundary').refreshBody();
    boundaries.create(576,256,'boundary').refreshBody();
    boundaries.create(576,224,'boundary').refreshBody();
    boundaries.create(576,192,'boundary').refreshBody();
    boundaries.create(576,160,'boundary').refreshBody();
    boundaries.create(576,128,'boundary').refreshBody();
    boundaries.create(576,96,'boundary').refreshBody();
    boundaries.create(576,64,'boundary').refreshBody();
    boundaries.create(576,32,'boundary').refreshBody();
    boundaries.create(448,32,'boundary').refreshBody();
    boundaries.create(416,32,'boundary').refreshBody();
    boundaries.create(384,32,'boundary').refreshBody();
    boundaries.create(352,32,'boundary').refreshBody();
    boundaries.create(320,32,'boundary').refreshBody();
    boundaries.create(486,288,'boundary').refreshBody();
    boundaries.create(486,320,'boundary').refreshBody();
    boundaries.create(480,160,'boundary').refreshBody();
    boundaries.create(384,160,'boundary').refreshBody();

    //Kithcen interactables
    //Rice cooker
    riceCooker = this.physics.add.staticSprite(288,64,'interaction');

    //Stoves:
    stove1 = this.physics.add.staticSprite(544,32,'interaction');
    stove2 = this.physics.add.staticSprite(512,32,'interaction');
    stove3 = this.physics.add.staticSprite(480,32,'interaction');

    //Cutting board
    cutting1 = this.physics.add.sprite(416,160,'interaction');
    cutting2 = this.physics.add.sprite(448,160,'interaction');

    //Dish drop off
    finalDish1 = this.physics.add.staticSprite(416,256,'interaction');
    finalDish2 = this.physics.add.staticSprite(416,288,'interaction');
    finalDish3 = this.physics.add.staticSprite(416,320,'interaction'); 

    //Creating food pantry boundaries 
    //boundaries.create(512,320,'boundary').refreshBody();
    boundaries.create(544,320,'boundary').refreshBody();
    boundaries.create(576,320,'boundary').refreshBody();
    boundaries.create(672,352,'boundary').refreshBody();
    boundaries.create(672,384,'boundary').refreshBody();
    boundaries.create(549,480,'boundary').refreshBody();
    boundaries.create(512,512,'boundary').refreshBody();
    boundaries.create(480,512,'boundary').refreshBody();
    boundaries.create(448,512,'boundary').refreshBody();
    boundaries.create(416,512,'boundary').refreshBody();
    boundaries.create(416,480,'boundary').refreshBody();
    boundaries.create(384,416,'boundary').refreshBody();
    boundaries.create(384,384,'boundary').refreshBody();

    //Pantry interactables
    interactionsP.create(645,416,'interaction').refreshBody();
    //interactionsP.create(645,448,'interaction').refreshBody();
    onionCrate = this.physics.add.staticSprite(613,448,'interaction'); //Onion
    tomatoCrate = this.physics.add.staticSprite(581,448,'interaction'); //Tomato
    interactionsP.create(549,448,'interaction').refreshBody(); 
    pickleCrate = this.physics.add.staticSprite(416,448,'interaction'); //Pickle

    meatStorage = this.physics.add.staticSprite(512,320,'interaction'); //Meat
    
    fish1 = this.physics.add.staticSprite(608,320,'interaction'); //Fish
    fish2 = this.physics.add.staticSprite(608,320,'interaction');
    fish3 = this.physics.add.staticSprite(608,320,'interaction');

    this.add.image(500, 300, 'floor');
    this.add.image(500, 300, 'wall');
    this.add.image(500, 300, 'furnitures');
    this.add.image(500, 300, 'behind_player');
    this.add.image(500, 300, 'on_top'); 
    

    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    player = this.physics.add.sprite(450, 350, 'Chef1Atlas');
    player2 = this.physics.add.sprite(450, 200, 'Chef2Atlas');
    player.body.setSize(20, 30);
    player2.body.setSize(20, 30);
    
    player.setCollideWorldBounds(true);

    // chef1 animation
    this.anims.create({ 
        key: 'left1',
        frames: [
            { key: 'Chef1Atlas', frame: 100 },
            { key: 'Chef1Atlas', frame: 99 },
            { key: 'Chef1Atlas', frame: 103 },
            { key: 'Chef1Atlas', frame: 101 },
            { key: 'Chef1Atlas', frame: 102 },
            { key: 'Chef1Atlas', frame: 103 }
        ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right1',
        frames: [
            { key: 'Chef1Atlas', frame: 124 },
            { key: 'Chef1Atlas', frame: 123 },
            { key: 'Chef1Atlas', frame: 51 },
            { key: 'Chef1Atlas', frame: 125 },
            { key: 'Chef1Atlas', frame: 126 },
            { key: 'Chef1Atlas', frame: 51 }
        ],
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
    // chef1 standing animation
    this.anims.create({
        key: 'faceLeft1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 32, end: 35 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'faceRight1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 51, end: 55 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'faceUp1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 56, end: 58 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'faceDown1',
        frames: this.anims.generateFrameNumbers('Chef1Atlas', { start: 27, end: 31 }),
        frameRate: 5,
        repeat: -1
    });

    // chef2 animation
    this.anims.create({
        key: 'right2',
        //frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 86, end: 89 }),
        frames: [
            { key: 'Chef2Atlas', frame: 87 },
            { key: 'Chef2Atlas', frame: 86 },
            { key: 'Chef2Atlas', frame: 35 },
            { key: 'Chef2Atlas', frame: 88 },
            { key: 'Chef2Atlas', frame: 89 },
            { key: 'Chef2Atlas', frame: 35 }
        ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left2',
        //frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 81, end: 85 }),
        frames: [
            { key: 'Chef2Atlas', frame: 82 },
            { key: 'Chef2Atlas', frame: 81 },
            { key: 'Chef2Atlas', frame: 85 },
            { key: 'Chef2Atlas', frame: 83 },
            { key: 'Chef2Atlas', frame: 84 },
            { key: 'Chef2Atlas', frame: 85 }
        ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 90, end: 95 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 75, end: 80 }),
        frameRate: 10,
        repeat: -1
    });
    // chef2 standing animation
    this.anims.create({
        key: 'faceRight2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 31, end: 35 }),
        frameRate: 5,    
        repeat: -1
    });
    this.anims.create({
        key: 'faceLeft2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 27, end: 30 }),
        frameRate: 5,
        repeat: -1    
    });
    this.anims.create({
        key: 'faceUp2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 36, end: 38 }),
        frameRate: 5,
        repeat: -1    
    });
    this.anims.create({
        key: 'faceDown2',
        frames: this.anims.generateFrameNumbers('Chef2Atlas', { start: 22, end: 26 }),
        frameRate: 5,
    });

    //Colliders for walls
    this.physics.add.collider(player, boundaries);
    this.physics.add.collider(player2, boundaries);

    //Colliders cutting board
    this.physics.add.collider(player, cutting1);
    this.physics.add.collider(player2, cutting1);
    this.physics.add.collider(player, cutting2);
    this.physics.add.collider(player2, cutting2);
    
    //Colliders for stoves
    this.physics.add.collider(player, stove1);
    this.physics.add.collider(player2, stove1);
    this.physics.add.collider(player, stove2);
    this.physics.add.collider(player2, stove2);
    this.physics.add.collider(player, stove3);
    this.physics.add.collider(player2, stove3);

    //Colliders for dish drop off
    this.physics.add.collider(player, finalDish1);
    this.physics.add.collider(player2, finalDish1);
    this.physics.add.collider(player, finalDish2);
    this.physics.add.collider(player2, finalDish2);
    this.physics.add.collider(player, finalDish3);
    this.physics.add.collider(player2, finalDish3);

    //Colliders for meat storage
    this.physics.add.collider(player, meatStorage);
    this.physics.add.collider(player2, meatStorage);

    //Colliders for fish storage
    this.physics.add.collider(player, fish1);
    this.physics.add.collider(player2, fish1);
    this.physics.add.collider(player, fish2);
    this.physics.add.collider(player2, fish2);
    this.physics.add.collider(player, fish3);
    this.physics.add.collider(player2, fish3);

    //Colliders for pickles
    this.physics.add.collider(player, onionCrate);
    this.physics.add.collider(player2, onionCrate);

    //Colliders for tomato crates
    this.physics.add.collider(player, tomatoCrate);
    this.physics.add.collider(player2, tomatoCrate);

    //Colliders for pickle crates
    this.physics.add.collider(player, pickleCrate);
    this.physics.add.collider(player2, pickleCrate);
}

function update ()
{
       // player1 movement
    cursors.left.on('down', function(event){
        player.setVelocityX(-75);
        player.setVelocityY(0);
        player.anims.play('left1', true);
    });
    cursors.left.on('up', function(event){
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('faceLeft1', true);
    });
    cursors.down.on('down', function(event){
        player.setVelocityX(0);
        player.setVelocityY(75);
        player.anims.play('down1', true);
    });
    cursors.down.on('up', function(event){
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('faceDown1', true);
    });
    cursors.right.on('down', function(event){
        player.setVelocityX(75);
        player.setVelocityY(0);
        player.anims.play('right1', true);
    });
    cursors.right.on('up', function(event){
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('faceRight1', true);
    });
    cursors.up.on('down', function(event){
        player.setVelocityX(0);
        player.setVelocityY(-75);
        player.anims.play('up1', true);
    });
    cursors.up.on('up', function(event){
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('faceUp1', true);
    });

    // player2 movement
    keyA.on('down', function(event){
        player2.setVelocityX(-75);
        player2.setVelocityY(0);
        player2.anims.play('left2', true);
    });
    keyA.on('up', function(event){
        player2.setVelocityX(0);
        player2.setVelocityY(0);
        player2.anims.play('faceLeft2', true);
    });
    keyS.on('down', function(event){
        player2.setVelocityY(75);
        player2.setVelocityX(0);
        player2.anims.play('down2', true);
    });
    keyS.on('up', function(event){
        player2.setVelocityX(0);
        player2.setVelocityY(0);
        player2.anims.play('faceDown2', true);
    });
    keyD.on('down', function(event){
        player2.setVelocityX(75);
        player2.setVelocityY(0);
        player2.anims.play('right2', true);
    });    
    keyD.on('up', function(event){
        player2.setVelocityX(0);
        player2.setVelocityY(0);
        player2.anims.play('faceRight2', true);
    });
    keyW.on('down', function(event){
        player2.setVelocityY(-75);
        player2.setVelocityX(0);
        player2.anims.play('up2', true);
    });
    keyW.on('up', function(event){
        player2.setVelocityX(0);
        player2.setVelocityY(0);
       

     player2.anims.play('faceUp2', true);
    });
        
}