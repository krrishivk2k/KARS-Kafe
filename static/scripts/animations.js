window.createAnimations = function createAnimations(anims) {
    anims.create({ 
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
    anims.create({
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
    anims.create({
        key: 'up1',
        frames: anims.generateFrameNumbers('Chef1Atlas', { start: 127, end: 132 }),
        frameRate: 10,
        repeat: -1
        
    });
    anims.create({
        key: 'down1',
        frames: anims.generateFrameNumbers('Chef1Atlas', { start: 93, end: 98 }),
        frameRate: 10,
        repeat: -1
    });
    // chef1 standing animation
    anims.create({
        key: 'faceLeft1',
        frames: anims.generateFrameNumbers('Chef1Atlas', { start: 32, end: 35 }),
        frameRate: 5,
        repeat: -1
    });
    anims.create({
        key: 'faceRight1',
        frames: anims.generateFrameNumbers('Chef1Atlas', { start: 51, end: 55 }),
        frameRate: 5,
        repeat: -1
    });
    anims.create({
        key: 'faceUp1',
        frames: anims.generateFrameNumbers('Chef1Atlas', { start: 56, end: 58 }),
        frameRate: 5,
        repeat: -1
    });
    anims.create({
        key: 'faceDown1',
        frames: anims.generateFrameNumbers('Chef1Atlas', { start: 27, end: 31 }),
        frameRate: 5,
        repeat: -1
    });

    // chef2 animation
    anims.create({
        key: 'right2',
        //frames: anims.generateFrameNumbers('Chef2Atlas', { start: 86, end: 89 }),
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
    anims.create({
        key: 'left2',
        //frames: anims.generateFrameNumbers('Chef2Atlas', { start: 81, end: 85 }),
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
    anims.create({
        key: 'up2',
        frames: anims.generateFrameNumbers('Chef2Atlas', { start: 90, end: 95 }),
        frameRate: 10,
        repeat: -1
    });
    anims.create({
        key: 'down2',
        frames: anims.generateFrameNumbers('Chef2Atlas', { start: 75, end: 80 }),
        frameRate: 10,
        repeat: -1
    });
    // chef2 standing animation
    anims.create({
        key: 'faceRight2',
        frames: anims.generateFrameNumbers('Chef2Atlas', { start: 31, end: 35 }),
        frameRate: 5,    
        repeat: -1
    });
    anims.create({
        key: 'faceLeft2',
        frames: anims.generateFrameNumbers('Chef2Atlas', { start: 27, end: 30 }),
        frameRate: 5,
        repeat: -1    
    });
    anims.create({
        key: 'faceUp2',
        frames: anims.generateFrameNumbers('Chef2Atlas', { start: 36, end: 38 }),
        frameRate: 5,
        repeat: -1    
    });
    anims.create({
        key: 'faceDown2',
        frames: anims.generateFrameNumbers('Chef2Atlas', { start: 22, end: 26 }),
        frameRate: 5,
    });
}