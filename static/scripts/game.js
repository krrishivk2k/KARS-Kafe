

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
    },
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
            interactwithCrate: interactwithCrate,
            interactWithKitchen: interactWithKitchen,
            interactWithStove: interactWithStove,
            interactwithDish: interactwithDish,
            interactionsDishes: interactionsDishes
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
    this.load.image('meat', 'static/food/meat.png');
    this.load.image('fish', 'static/food/fish.png');
    this.load.image('rice', 'static/food/rice.png');

    //Loading Dish
    this.load.image('dish', 'static/Dish.png');

    //Loading chopped food
    this.load.image('chopOnion', 'static/food/chopped_onion.png');
    this.load.image('chopTomato', 'static/food/chopped_tomato.png');
    this.load.image('chopMeat', 'static/food/chopped_meat.png');
    this.load.image('chopFish', 'static/food/chopped_fish.png');

    //Loading cooked food
    this.load.image('cookMeat', 'static/food/cooked_meat.png');
    this.load.image('cookFish', 'static/food/cooked_fish.png');


    //load order
    this.load.image('sushiPickleR', 'static/sushiPickleR.png');
    this.load.image('tomatoSoupR', 'static/tomatoSoupR.png');

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
    this.dishes = 0;
    this.i = 0;
    this.orders = {};
    this.listOrders = [];
    this.orders = {
        1: 'sushiPickleR',
        2: 'tomatoSoupR'
    };
    

    for (let i = 0; i < 3; i++){
        let order = Phaser.Math.Between(1,2);
        this.listOrders.push(this.orders[order]);
    }

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

    dish1 = this.physics.add.sprite(574,64,'interaction');
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

    floor = this.add.image(500, 300, 'floor');
    wall = this.add.image(500, 300, 'wall');
    furnitures = this.add.image(500, 300, 'furnitures');
    behindPlayer = this.add.image(500, 300, 'behind_player');
    onTop = this.add.image(500, 300, 'on_top'); 
    floor.setDepth(0);
    wall.setDepth(0);
    furnitures.setDepth(0);
    behindPlayer.setDepth(0);
    onTop.setDepth(1);
    

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
    cuttingAnimation = this.physics.add.sprite(431, 135, 'floatIcon');
    stoveAnimation1 = this.physics.add.sprite(544, 32, 'floatIcon');
    stoveAnimation2 = this.physics.add.sprite(512, 32, 'floatIcon');
    stoveAnimation3 = this.physics.add.sprite(480, 32, 'floatIcon');
    cuttingAnimation.setDepth(3);
    stoveAnimation1.setDepth(2);
    stoveAnimation2.setDepth(2);
    stoveAnimation3.setDepth(2);

    fishIcon.setDepth(1);
    meatIcon.setDepth(1);
    onionIcon.setDepth(1);
    tomatoIcon.setDepth(1);
    pickleIcon.setDepth(1);
    riceIcon.setDepth(1);
    cutIcon.setDepth(1);

    player = this.physics.add.sprite(450, 200, 'Chef1Atlas');
    player2 = this.physics.add.sprite(450, 350, 'Chef2Atlas');
    player.body.setSize(20, 30);
    player.body.slideFactor.set(0,0);
    player2.body.slideFactor.set(0,0);
    player.body.setOffset(5, 35); 
    player2.body.setSize(20, 30);
    player2.body.setOffset(5, 35); 
    player.setDepth(5);
    player2.setDepth(5);

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
    var cursorKeys = this.input.keyboard.createCursorKeys();
    var floorItemArr = [];
    // player 1 interaction
    this.input.keyboard.on('keydown-M', () => {
        var floorItem;
        if(cursorKeys.left.isDown) latestDirection1 = 'left';
        else if(cursorKeys.right.isDown) latestDirection1 = 'right';
        else if(cursorKeys.up.isDown) latestDirection1 = 'up';
        else if(cursorKeys.down.isDown) latestDirection1 = 'down';
        // check if the player is close enough to the onion crate to interact with it
        if(!player.hasItem){
            let distanceOnion = Phaser.Math.Distance.Between(player.x, player.y, onionCrate.x, onionCrate.y);
            if(distanceOnion < 50 && latestDirection1 == 'down'){
                this.physics.add.collider(player, onionCrate, this.interactwithCrate(player, 'onion'));
            }
            // check if the player is close enough to the tomato crate to interact with it
            let distanceTomato = Phaser.Math.Distance.Between(player.x, player.y, tomatoCrate.x, tomatoCrate.y);
            if(distanceTomato < 50 && latestDirection1 == 'down'){
                this.physics.add.collider(player, tomatoCrate, this.interactwithCrate(player, 'tomato'));
            }
            // check if the player is close enough to the pickle crate to interact with it
            let distancePickle = Phaser.Math.Distance.Between(player.x, player.y, pickleCrate.x, pickleCrate.y);
            if((distancePickle < 50 && latestDirection1 == 'down' && player.y < pickleCrate.y - 34) || 
            (distancePickle < 50 && latestDirection1 == 'left' && player.x > pickleCrate.x)){
                this.physics.add.collider(player, pickleCrate, this.interactwithCrate(player, 'pickle'));
            }
            // check if the player is close enough to the meat storage to interact with it
            let distanceMeat = Phaser.Math.Distance.Between(player.x, player.y, meatStorage.x, meatStorage.y);
            if(distanceMeat < 50 && latestDirection1 == 'up'){
                this.physics.add.collider(player, meatStorage, this.interactwithCrate(player, 'meat'));
            }
            // check if the player is close enough to the fish storage to interact with it
            let distanceFish1 = Phaser.Math.Distance.Between(player.x, player.y, fish1.x, fish1.y);
            let distanceFish2 = Phaser.Math.Distance.Between(player.x, player.y, fish2.x, fish2.y);
            let distanceFish3 = Phaser.Math.Distance.Between(player.x, player.y, fish3.x, fish3.y);
            if((distanceFish1 < 50 || distanceFish2 < 50 || distanceFish3 < 50) && latestDirection1 == 'up'){
                this.physics.add.collider(player, fish1, this.interactwithCrate(player, 'fish'));
                this.physics.add.collider(player, fish2, this.interactwithCrate(player, 'fish'));
                this.physics.add.collider(player, fish3, this.interactwithCrate(player, 'fish'));
            }
            //check if player is close enough to the rice cooker to interact with it
            let distanceRice = Phaser.Math.Distance.Between(player.x, player.y, riceCooker.x, riceCooker.y);
            if(distanceRice < 50 && latestDirection1 == 'left'){
                this.physics.add.collider(player, riceCooker, this.interactwithCrate(player, 'rice'));
            }
            
            // check if the player is close enough to an item on the floor to pick it up
            for(let i = 0; i < floorItemArr.length; i++){
                let distanceItem = Phaser.Math.Distance.Between(player.x, player.y, floorItemArr[i].x, floorItemArr[i].y);
                isDown = latestDirection1 == 'down' && player.y < floorItemArr[i].y;
                isUp = latestDirection1 == 'up' && player.y > floorItemArr[i].y;
                isLeft = latestDirection1 == 'left' && player.x > floorItemArr[i].x;
                isRight = latestDirection1 == 'right' && player.x < floorItemArr[i].x;
                if(distanceItem < 50 && (isDown || isUp || isLeft || isRight)){
                    player.heldItem = floorItemArr[i].texture.key;
                    if(player.heldItem!='dish'){
                        player.itemSprite = this.add.image(player.x, player.y, player.heldItem).setScale(1.5);
                    }
                    else{
                        player.itemSprite = this.add.image(player.x, player.y, player.heldItem).setScale(.25);
                    }
                    player.itemSprite.setDepth(5);
                    player.hasItem = true;
                    floorItemArr[i].destroy();
                    floorItemArr.splice(i, 1);
                }
            }
        }
        // if player is holding an item drop it
        else if(player.hasItem) {
            //floorItem = this.physics.add.sprite(player.x, player.y, player.heldItem);
            if(latestDirection1 == 'up') 
                floorItem = this.physics.add.sprite(player.x, player.y, player.heldItem);
            else if(latestDirection1 == 'down') 
                floorItem = this.physics.add.sprite(player.x, player.y + 30, player.heldItem);
            else if(latestDirection1 == 'left') 
                floorItem = this.physics.add.sprite(player.x - 12, player.y + 10, player.heldItem);
            else if(latestDirection1 == 'right') 
                floorItem = this.physics.add.sprite(player.x + 16, player.y + 10, player.heldItem);
            if(player.heldItem!='dish'){
                floorItem.setScale(1.5);
            }
            else{
                floorItem.setScale(0.25);
            }
            floorItem.setDepth(2);
            floorItemArr.push(floorItem);
            player.itemSprite.destroy();
            player.hasItem = false;
        }
    });
    // player 2 interaction
    this.input.keyboard.on('keydown-E', () => {
        var floorItem;
        if(keyA.isDown) latestDirection2 = 'left';
        else if(keyD.isDown) latestDirection2 = 'right';
        else if(keyW.isDown) latestDirection2 = 'up';
        else if(keyS.isDown) latestDirection2 = 'down';
        // check if the player is close enough to the onion crate to interact with it
        if(!player2.hasItem){
            let distanceOnion = Phaser.Math.Distance.Between(player2.x, player2.y, onionCrate.x, onionCrate.y);
            if(distanceOnion < 50 && latestDirection2 == 'down'){
                this.physics.add.collider(player2, onionCrate, this.interactwithCrate(player2, 'onion'));
            }
            // check if the player is close enough to the tomato crate to interact with it
            let distanceTomato = Phaser.Math.Distance.Between(player2.x, player2.y, tomatoCrate.x, tomatoCrate.y);
            if(distanceTomato < 50 && latestDirection2 == 'down'){
                this.physics.add.collider(player2, tomatoCrate, this.interactwithCrate(player2, 'tomato'));
            }
            // check if the player is close enough to the pickle crate to interact with it
            let distancePickle = Phaser.Math.Distance.Between(player2.x, player2.y, pickleCrate.x, pickleCrate.y);
            if((distancePickle < 50 && latestDirection2 == 'down' && player2.y < pickleCrate.y - 34) || 
            (distancePickle < 50 && latestDirection2 == 'left' && player2.x > pickleCrate.x)){
                this.physics.add.collider(player2, pickleCrate, this.interactwithCrate(player2, 'pickle'));
            }
            // check if the player is close enough to the meat storage to interact with it
            let distanceMeat = Phaser.Math.Distance.Between(player2.x, player2.y, meatStorage.x, meatStorage.y);
            if(distanceMeat < 50 && latestDirection2 == 'up'){
                this.physics.add.collider(player2, meatStorage, this.interactwithCrate(player2, 'meat'));
            }
            // check if the player is close enough to the fish storage to interact with it
            let distanceFish1 = Phaser.Math.Distance.Between(player2.x, player2.y, fish1.x, fish1.y);
            let distanceFish2 = Phaser.Math.Distance.Between(player2.x, player2.y, fish2.x, fish2.y);
            let distanceFish3 = Phaser.Math.Distance.Between(player2.x, player2.y, fish3.x, fish3.y);
            if((distanceFish1 < 50 || distanceFish2 < 50 || distanceFish3 < 50) && latestDirection2 == 'up'){
                this.physics.add.collider(player2, fish1, this.interactwithCrate(player2, 'fish'));
                this.physics.add.collider(player2, fish2, this.interactwithCrate(player2, 'fish'));
                this.physics.add.collider(player2, fish3, this.interactwithCrate(player2, 'fish'));
            }
            // check if the player is close enough to an item on the floor to pick it up
            for(let i = 0; i < floorItemArr.length; i++){
                let distanceItem = Phaser.Math.Distance.Between(player2.x, player2.y, floorItemArr[i].x, floorItemArr[i].y);
                isDown = latestDirection2 == 'down' && player2.y < floorItemArr[i].y;
                isUp = latestDirection2 == 'up' && player2.y > floorItemArr[i].y;
                isLeft = latestDirection2 == 'left' && player2.x > floorItemArr[i].x;
                isRight = latestDirection2 == 'right' && player2.x < floorItemArr[i].x;
                if(distanceItem < 50 && (isDown || isUp || isLeft || isRight)){
                    player2.heldItem = floorItemArr[i].texture.key;
                    if(player2.heldItem!='dish'){
                        player2.itemSprite = this.add.image(player2.x, player2.y, player2.heldItem).setScale(1.5);
                    }
                    else{
                        player2.itemSprite = this.add.image(player2.x, player2.y, player2.heldItem).setScale(.25);
                    }
                    player2.itemSprite.setDepth(5);
                    player2.hasItem = true;
                    floorItemArr[i].destroy();
                    floorItemArr.splice(i, 1);
                }
            }
        }
        // if player is holding an item drop it
        else if(player2.hasItem) {
            if(latestDirection2 == 'up') 
                floorItem = this.physics.add.sprite(player2.x, player2.y, player2.heldItem);
            else if(latestDirection2 == 'down') 
                floorItem = this.physics.add.sprite(player2.x, player2.y + 30, player2.heldItem);
            else if(latestDirection2 == 'left') 
                floorItem = this.physics.add.sprite(player2.x - 12, player2.y + 10, player2.heldItem);
            else if(latestDirection2 == 'right') 
                floorItem = this.physics.add.sprite(player2.x + 16, player2.y + 10, player2.heldItem);
            if(player.heldItem!='dish'){
                floorItem.setScale(1.5);
            }
            else{
                floorItem.setScale(0.25);
            }
            floorItem.setDepth(2);
            floorItemArr.push(floorItem);
            player2.itemSprite.destroy();
            player2.hasItem = false;
        }
    });

    this.add.image(800, 200*this.i +100, this.listOrders[this.i]).setScale(0.1);
            this.i++;
this.time.addEvent({
        delay: 10000,
        callback: () => {
            this.add.image(800, 200*this.i +100, this.listOrders[this.i]).setScale(0.1);
            this.i++;
        },
        repeat: 3
    });
    setTimeout(() => {
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if(this.listOrders.length<3){
                    let order = Phaser.Math.Between(1,2);
                    this.listOrders.push(this.orders[order]);
                }
                else{
			    if(this.i < 3){
                    this.add.image(800, 200*this.i +100, this.listOrders[this.i]).setScale(0.1);
                   		this.i++;
			    }
                }
        },
            repeat: 8
    });
}, 30000);
    
    

    stoveAnimation1.visible = false;
    stoveAnimation2.visible = false;
    stoveAnimation3.visible = false;
    
}
function interactwithDish(player, sprite){
    if(!player.hasItem && this.dishes<3){
        player.heldItem = sprite+str(this.dishes);
        this.dishes++;
        playerContainer = this.add.container();
        player.itemSprite = this.add.image(player.x, player.y, sprite).setScale(.25);
        player.itemSprite.setDepth(5);
        player.hasItem = true;
        sprite.heldItem =[];

    }
}
function interactwithCrate(player, sprite){
    if(!player.hasItem){
        player.heldItem = sprite;

        playerContainer = this.add.container();
    
        player.itemSprite = this.add.image(player.x, player.y, sprite).setScale(1.5);
        player.itemSprite.setDepth(5);
        player.hasItem = true;
    }
}

function interactionsDishes(player, sprite){
        sprite.heldItem.append(player.heldItem);
        sprite.itemSprite = this.add.image(sprite.x, sprite.y, player.heldItem).setScale(1.5);
        console.long(sprite.heldItem);
        player.itemSprite.destroy();
        player.hasItem = false;
    

}

function interactWithKitchen(player, sprite) { 
    if (player.hasItem && player.itemSprite != null) {
        sprite.heldItem = player.heldItem;
        sprite.hasItem = true;

        if (player.heldItem == 'onion') {
            player.itemSprite.destroy();
            player.itemSprite = null;
            player.itemSprite = this.add.image(player.x, player.y, 'chopOnion');
            player.heldItem = 'chopOnion';
            player.hasItem = true;
        } else if (player.heldItem === 'tomato') {
            player.itemSprite.destroy();
            player.itemSprite = this.add.image(player.x, player.y, 'chopTomato').setScale(1.5);
            player.heldItem = 'chopTomato';
            player.hasItem = true;
        } else if (player.heldItem === 'fish') {
            player.itemSprite.destroy();
            player.itemSprite = this.add.image(player.x, player.y, 'chopFish').setScale(1.5);
            player.heldItem = 'chopFish';
            player.hasItem = true;
        } else if (player.heldItem === 'meat') {
            player.itemSprite.destroy();
            player.itemSprite = this.add.image(player.x, player.y, 'chopMeat').setScale(1.5);
            player.heldItem = 'chopMeat';
            player.hasItem = true;
        }else if (player.heldItem === 'rice') {
            player.itemSprite.destroy();
            player.itemSprite = this.add.image(player.x, player.y, 'rice').setScale(1.5);
            player.heldItem = 'rice';
            player.hasItem = true;
        }

        timer = 410;
    }
}

function interactWithStove(player, sprite) { 
    if (player.hasItem && player.itemSprite != null) {

        if (player.heldItem == 'chopFish') {
            player.itemSprite = this.add.image(player.x, player.y, 'cookFish');
            player.heldItem = 'cookFish';
            player.hasItem = true;
        } else if (player.heldItem === 'chopMeat') {
            player.itemSprite = this.add.image(player.x, player.y, 'cookMeat').setScale(1.5);
            player.heldItem = 'cookMeat';
            player.hasItem = true;
        } 
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

    var keyObj = this.input.keyboard.addKey("N");

    if (keyObj.isDown) {

        if(cursorKeys.left.isDown) latestDirection1 = 'left';
        else if(cursorKeys.right.isDown) latestDirection1 = 'right';
        else if(cursorKeys.up.isDown) latestDirection1 = 'up';
        else if(cursorKeys.down.isDown) latestDirection1 = 'down';

        // check if the player is close enough to the cutting board to interact with it
        distanceCutting1 = Phaser.Math.Distance.Between(player.x, player.y, cutting1.x, cutting1.y);
        distanceCutting2 = Phaser.Math.Distance.Between(player.x, player.y, cutting2.x, cutting2.y);
        if ((distanceCutting1 < 50 && (latestDirection1 === 'up')) || (distanceCutting2 < 50 && (latestDirection1 === 'up'))) {
            timer -= 3;
            console.log(timer);
            player.isInteracting = true;

            cuttingAnimation.visible = true;
            cuttingAnimation.anims.play('cuttingAnimation', true);
        }

        distanceCook1 = Phaser.Math.Distance.Between(player.x, player.y, stove1.x, stove1.y);
        distanceCook2 = Phaser.Math.Distance.Between(player.x, player.y, stove2.x, stove2.y);
        distanceCook3 = Phaser.Math.Distance.Between(player.x, player.y, stove3.x, stove3.y);
        if (distanceCook1 < 50 && (latestDirection1 == 'up')) {
            stoveAnimation1.visible = true;
            stoveAnimation1.anims.play('stoveAnimation1', true);
            this.physics.add.collider(player, stove1, this.interactWithStove(player, stove1));
        } else if (distanceCook2 < 50 && (latestDirection1 == 'up')) {
            stoveAnimation2.visible = true;
            stoveAnimation2.anims.play('stoveAnimation2', true);
            this.physics.add.collider(player, stove2, this.interactWithStove(player, stove2));
        } else if (distanceCook3 < 50 && (latestDirection1 == 'up')) {
            stoveAnimation3.visible = true;
            stoveAnimation3.anims.play('stoveAnimation3', true);
            this.physics.add.collider(player, stove3, this.interactWithStove(player, stove3));
        }
 
    }

    else {
        timer = 410;
        cuttingAnimation.anims.stop();
        player.isInteracting = false;
    }

    keyObj.on('up', function(event) {
        timer = 410;
        cuttingAnimation.visible = false;
        player.isInteracting = false;
    });

    if (timer <= 0) {
        console.log("done");
        cuttingAnimation.visible = true;
        this.physics.add.collider(player, cutting1,  this.interactWithKitchen(player, cutting1));
        player.isInteracting = false;
        
    }
    var keyObj2 = this.input.keyboard.addKey("M");
    if(keyObj2.isDown){
        distanceDish1 = Phaser.Math.Distance.Between(player.x, player.y, dish1.x, dish1.y);
        if (distanceDish1 < 50 && (latestDirection1 == 'right')) {
            this.physics.add.collider(player, dish1, this.interactwithDish(player, 'dish'));
        }
    }
    
    cutIcon.anims.play('cutAni', true);


    if (cursorKeys.left.isDown && !player.isInteracting) {
        player.setVelocityX(-75);
        player.setVelocityY(0);
        player.anims.play('left1', true);

        latestDirection1 = 'left';
    }
    else if (cursorKeys.right.isDown && !player.isInteracting) {
        player.setVelocityX(75);
        player.setVelocityY(0);
        player.anims.play('right1', true);

        latestDirection1 = 'right';
    }
    else if (cursorKeys.up.isDown && !player.isInteracting) {
        player.setVelocityY(-75);
        player.setVelocityX(0);
        player.anims.play('up1', true);

        latestDirection1 = 'up';
    }
    else if (cursorKeys.down.isDown && !player.isInteracting) {
        player.setVelocityY(75);
        player.setVelocityX(0);
        player.anims.play('down1', true);

        latestDirection1 = 'down';
    }
    else if (player.isInteracting) {
        player.setVelocityX(0);
        player.setVelocityY(0);
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
    
    // update the position of the item sprite if the player has an item
    if (player.hasItem && !player.isInteracting) {
        yOffset = 10;
        xOffset = 0;
        if (latestDirection1 == 'up') yOffset += -170000;
        else if (latestDirection1 == 'down') yOffset += 10;
        else if (latestDirection1 == 'left') xOffset += -12;
        else if (latestDirection1 == 'right') xOffset += 16;

        player.itemSprite.x = player.x + xOffset;
        player.itemSprite.y = player.y + yOffset;
    }
    if (player2.hasItem) {
        yOffset = 10;
        xOffset = 0;
        if (latestDirection2 == 'up') yOffset += -170000;
        else if (latestDirection2 == 'down') yOffset += 10;
        else if (latestDirection2 == 'left') xOffset += -12;
        else if (latestDirection2 == 'right') xOffset += 16;

        player2.itemSprite.x = player2.x + xOffset;
        player2.itemSprite.y = player2.y + yOffset;
    }
        
}