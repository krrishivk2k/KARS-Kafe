

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
        update: update,
        extend: {
            interactwithCrate: interactwithCrate
        }
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
    this.load.spritesheet('floatIcon', 'static/float_icons.png',{ frameWidth: 34, frameHeight: 34 });
    this.load.image('on_top', 'static/map/on_top.png');

    //Loading the food
    this.load.image('onion', 'static/food/onion.png');
    this.load.image('tomato', 'static/food/tomato.png');
    this.load.image('pickle', 'static/food/pickle.png');

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

    this.add.image(500, 300, 'blackwall'); 
    
    //Creating Kitchen boundaries
    createKitchenBoundaries(boundaries);

    //Kithcen interactables
    //Rice cooker
    riceCooker = this.physics.add.staticSprite(288,64,'interaction');

    //Stoves:
    stove1 = this.physics.add.staticSprite(544,32,'interaction');
    stove2 = this.physics.add.staticSprite(512,32,'interaction');
    stove3 = this.physics.add.staticSprite(480,32,'interaction');

    //Cutting board
    cutting1 = this.physics.add.sprite(416,160,'interaction');
    cutting1.setImmovable(true);
    cutting2 = this.physics.add.sprite(448,160,'interaction');
    cutting2.setImmovable(true);

    //Dish drop off
    finalDish1 = this.physics.add.staticSprite(416,256,'interaction');
    finalDish2 = this.physics.add.staticSprite(416,288,'interaction');
    finalDish3 = this.physics.add.staticSprite(416,320,'interaction'); 

    //Creating food pantry boundaries 
    //boundaries.create(512,320,'boundary').refreshBody();
    createFoodPantryBoundaries(boundaries);

    //Pantry interactables
    
    onionCrate = this.physics.add.staticSprite(613,448,'interaction'); //Onion
    tomatoCrate = this.physics.add.staticSprite(581,448,'interaction'); //Tomato
    
    pickleCrate = this.physics.add.staticSprite(416,448,'interaction'); //Pickle

    meatStorage = this.physics.add.staticSprite(512,320,'interaction'); //Meat
    
    fish1 = this.physics.add.staticSprite(608,320,'interaction'); //Fish
    fish2 = this.physics.add.staticSprite(672,320,'interaction');
    fish3 = this.physics.add.staticSprite(640,320,'interaction');

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

    //Icons:
    fishIcon = this.physics.add.sprite(610, 298, 'floatIcon');
    meatIcon = this.physics.add.sprite(520, 310, 'floatIcon');
    onionIcon = this.physics.add.sprite(613,435, 'floatIcon');
    tomatoIcon = this.physics.add.sprite(581,435, 'floatIcon');
    pickleIcon = this.physics.add.sprite(416,435, 'floatIcon');
    riceIcon = this.physics.add.sprite(295, 64, 'floatIcon')
    cutIcon = this.physics.add.sprite(431, 135, 'floatIcon');

    player = this.physics.add.sprite(450, 200, 'Chef1Atlas');
    player2 = this.physics.add.sprite(450, 350, 'Chef2Atlas');
    player.body.setSize(20, 30);
    player.body.slideFactor.set(0,0);
    player2.body.slideFactor.set(0,0);
    player.body.setOffset(5, 35); 
    player2.body.setSize(20, 30);
    player2.body.setOffset(5, 35); 

    this.physics.add.collider(player, player2);
    this.physics.add.collider(player2, player);
    
    player.setCollideWorldBounds(true);

    // create the animations for the players
    createAnimations(this.anims);


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
    
   // these two variables are used to keep track of the latest direction the players moved in (for animations / interactions)
    latestDirection1 = 'down';
    latestDirection2 = 'down';
    this.input.keyboard.on('keydown-E', () => {
        let distance = Phaser.Math.Distance.Between(player.x, player.y, onionCrate.x, onionCrate.y);
        if (distance < 100) {
            this.interactwithCrate(player, onionCrate);
        }
        
    });
    
}
function interactwithCrate(player, crate){
    if(!player.hasItem){
        player.heldItem = 'onion';
        this.add.image(player.x, player.y, 'onion');
        player.hasItem = true;
    }
}

function update ()
{
    // player1 movement
    var cursorKeys = this.input.keyboard.createCursorKeys();

    fishIcon.anims.play('fishAni', true);
    meatIcon.anims.play('meatAni', true);
    onionIcon.anims.play('onionAni', true);
    tomatoIcon.anims.play('tomatoAni', true);
    pickleIcon.anims.play('pickleAni', true);
    riceIcon.anims.play('riceAni', true);
    cutIcon.anims.play('cutAni', true);

    if (cursorKeys.left.isDown) {
        player.setVelocityX(-75);
        player.setVelocityY(0);
        player.anims.play('left1', true);

        latestDirection1 = 'left';
    }
    else if (cursorKeys.right.isDown) {
        player.setVelocityX(75);
        player.setVelocityY(0);
        player.anims.play('right1', true);

        latestDirection1 = 'right';
    }
    else if (cursorKeys.up.isDown) {
        player.setVelocityY(-75);
        player.setVelocityX(0);
        player.anims.play('up1', true);

        latestDirection1 = 'up';
    }
    else if (cursorKeys.down.isDown) {
        player.setVelocityY(75);
        player.setVelocityX(0);
        player.anims.play('down1', true);

        latestDirection1 = 'down';
    }
    else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        if (latestDirection1 == 'left') player.anims.play('faceLeft1', true);
        else if (latestDirection1 == 'right') player.anims.play('faceRight1', true);
        else if (latestDirection1 == 'up') player.anims.play('faceUp1', true);
        else if (latestDirection1 == 'down') player.anims.play('faceDown1', true);
    }



    // player2 movement
    if (keyA.isDown) {
        player2.setVelocityX(-75);
        player2.setVelocityY(0);
        player2.anims.play('left2', true);

        latestDirection2 = 'left';
    }
    else if (keyD.isDown) {
        player2.setVelocityX(75);
        player2.setVelocityY(0);
        player2.anims.play('right2', true);

        latestDirection2 = 'right';
    }
    else if (keyW.isDown) {
        player2.setVelocityY(-75);
        player2.setVelocityX(0);
        player2.anims.play('up2', true);

        latestDirection2 = 'up';
    }
    else if (keyS.isDown) {
        player2.setVelocityY(75);
        player2.setVelocityX(0);
        player2.anims.play('down2', true);

        latestDirection2 = 'down';
    }
    else {
        player2.setVelocityX(0);
        player2.setVelocityY(0);
        if (latestDirection2 == 'left') player2.anims.play('faceLeft2', true);
        else if (latestDirection2 == 'right') player2.anims.play('faceRight2', true);
        else if (latestDirection2 == 'up') player2.anims.play('faceUp2', true);
        else if (latestDirection2 == 'down') player2.anims.play('faceDown2', true);
    }
    
        
}