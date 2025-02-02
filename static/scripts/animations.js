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

    anims.create({
        key: 'fishAni',
        frames: anims.generateFrameNumbers('floatIcon', { start: 40, end: 47}),
        frameRate: 5,
    });
    anims.create({
        key: 'meatAni',
        frames: anims.generateFrameNumbers('floatIcon', { start: 48, end: 55}),
        frameRate: 5,
    });
    anims.create({
        key: 'onionAni',
        frames: anims.generateFrameNumbers('floatIcon', { start: 56, end: 62}),
        frameRate: 5,
    });
    anims.create({
        key: 'pickleAni',
        frames: anims.generateFrameNumbers('floatIcon', { start: 64, end: 70}),
        frameRate: 5,
    });
    anims.create({
        key: 'tomatoAni',
        frames: anims.generateFrameNumbers('floatIcon', { start: 88, end: 95}),
        frameRate: 5,
    });
    anims.create({
        key: 'riceAni',
        frames: anims.generateFrameNumbers('floatIcon', { start: 80, end: 87}),
        frameRate: 5,
    });
    anims.create({
        key: 'cutAni',
        frames: anims.generateFrameNumbers('floatIcon', { start: 0, end: 7}),
        frameRate: 5,
    });
    cuttingAnimation.anims.create({
        key: 'cuttingAnimation',
        frames: [
            { key: 'floatIcon', frame: 8 },
            { key: 'floatIcon', frame: 9 },
            { key: 'floatIcon', frame: 10 },
            { key: 'floatIcon', frame: 11 },
            { key: 'floatIcon', frame: 12 },
            { key: 'floatIcon', frame: 13 },
            { key: 'floatIcon', frame: 14 },
            { key: 'floatIcon', frame: 15 },
            { key: 'floatIcon', frame: 24 },
            { key: 'floatIcon', frame: 25 },
            { key: 'floatIcon', frame: 26 },
            { key: 'floatIcon', frame: 27 },
            { key: 'floatIcon', frame: 28 }
        ],
        frameRate: 4
    });

    stoveAnimation1.anims.create({
        key: 'stoveAnimation1',
        frames: [
            { key: 'floatIcon', frame: 8 },
            { key: 'floatIcon', frame: 9 },
            { key: 'floatIcon', frame: 10 },
            { key: 'floatIcon', frame: 11 },
            { key: 'floatIcon', frame: 12 },
            { key: 'floatIcon', frame: 13 },
            { key: 'floatIcon', frame: 14 },
            { key: 'floatIcon', frame: 15 },
            { key: 'floatIcon', frame: 24 },
            { key: 'floatIcon', frame: 25 },
            { key: 'floatIcon', frame: 26 },
            { key: 'floatIcon', frame: 27 },
            { key: 'floatIcon', frame: 28 }
        ],
        frameRate: 5,
        hideOnComplete: true
    });
    stoveAnimation2.anims.create({
        key: 'stoveAnimation2',
        frames: [
            { key: 'floatIcon', frame: 8 },
            { key: 'floatIcon', frame: 9 },
            { key: 'floatIcon', frame: 10 },
            { key: 'floatIcon', frame: 11 },
            { key: 'floatIcon', frame: 12 },
            { key: 'floatIcon', frame: 13 },
            { key: 'floatIcon', frame: 14 },
            { key: 'floatIcon', frame: 15 },
            { key: 'floatIcon', frame: 24 },
            { key: 'floatIcon', frame: 25 },
            { key: 'floatIcon', frame: 26 },
            { key: 'floatIcon', frame: 27 },
            { key: 'floatIcon', frame: 28 }
        ],
        frameRate: 5,
        hideOnComplete: true
    });
    stoveAnimation3.anims.create({
        key: 'stoveAnimation3',
        frames: [
            { key: 'floatIcon', frame: 8 },
            { key: 'floatIcon', frame: 9 },
            { key: 'floatIcon', frame: 10 },
            { key: 'floatIcon', frame: 11 },
            { key: 'floatIcon', frame: 12 },
            { key: 'floatIcon', frame: 13 },
            { key: 'floatIcon', frame: 14 },
            { key: 'floatIcon', frame: 15 },
            { key: 'floatIcon', frame: 24 },
            { key: 'floatIcon', frame: 25 },
            { key: 'floatIcon', frame: 26 },
            { key: 'floatIcon', frame: 27 },
            { key: 'floatIcon', frame: 28 }
        ],
        frameRate: 5,
        hideOnComplete: true
    });
}