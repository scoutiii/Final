// Constants to reference screens
MyGame.constants.screens = Object.freeze({
    mainMenu: "mainMenu",
    controlMenu: "controlMenu",
    credits: "credits",
    gamePlay: "gamePlay",
    highScores: "highScores",
    pauseMenu: "pauseMenu"
});

// Options for draw text
MyGame.constants.textOptions = Object.freeze({
    align: {
        center: "center",
        left: "left",
        right: "start"
    },
    baseline: {
        top: "top",
        middle: "middle",
        bottom: "bottom"
    }
});

// Controls

MyGame.constants.controls = "MyGame.misc.controls";

// size of the canvas scaling (should be like the vh in the css file)
// and the game global size
MyGame.constants.canvasScaleFactor = .9;
MyGame.constants.globalSize = {
    width: 1000,
    height: 1000
};
MyGame.constants.gridDim = 19;
MyGame.constants.gridSize = {
    width: MyGame.constants.globalSize.width / MyGame.constants.gridDim,
    height: MyGame.constants.globalSize.height / MyGame.constants.gridDim
};

// Defines some names for the creeps
// Note the intended color order is green, blue, yellow, red
MyGame.constants.creeps = {};
MyGame.constants.creeps = {
    grunt: {
        fourth: 'creep-red-1',
        first: 'creep-green-1',
        second: 'creep-blue-1',
        third: 'creep-yellow-1'
    },
    hunter: {
        fourth: 'creep-red-2',
        first: 'creep-green-2',
        second: 'creep-blue-2',
        third: 'creep-yellow-2'
    },
    bugger: {
        fourth: 'creep-red-3',
        first: 'creep-green-3',
        second: 'creep-blue-3',
        third: 'creep-yellow-3'
    }
};
MyGame.constants.creeps.stats = {
    'creep-green-1': { speed: 10, health: 100 }, // Stats for grunts
    'creep-blue-1': { speed: 15, health: 105 },
    'creep-yellow-1': { speed: 20, health: 110 },
    'creep-red-1': { speed: 25, health: 120 },
    'creep-green-2': { speed: 5, health: 200 }, // health for hunters
    'creep-blue-2': { speed: 6, health: 210 },
    'creep-yellow-2': { speed: 7, health: 220 },
    'creep-red-2': { speed: 10, health: 230 },
    'creep-green-3': { speed: 20, health: 50 }, // health for buggers
    'creep-blue-3': { speed: 22, health: 55 },
    'creep-yellow-3': { speed: 25, health: 60 },
    'creep-red-3': { speed: 30, health: 65 }
};
MyGame.constants.creeps.animation = {
    'creep-green-1': { // timings for grunts
        spriteCount: 6,
        spriteTime: [1000, 200, 100, 1000, 100, 200]
    },
    'creep-blue-1': {
        spriteCount: 6,
        spriteTime: [1000, 200, 100, 1000, 100, 200]
    },
    'creep-yellow-1': {
        spriteCount: 6,
        spriteTime: [1000, 200, 100, 1000, 100, 200]
    },
    'creep-red-1': {
        spriteCount: 6,
        spriteTime: [1000, 200, 100, 1000, 100, 200]
    },
    'creep-green-2': { // timings for hunters
        spriteCount: 4,
        spriteTime: [200, 1000, 200, 600]
    },
    'creep-blue-2': {
        spriteCount: 4,
        spriteTime: [200, 1000, 200, 600]
    },
    'creep-yellow-2': {
        spriteCount: 4,
        spriteTime: [200, 1000, 200, 600]
    },
    'creep-red-2': {
        spriteCount: 4,
        spriteTime: [200, 1000, 200, 600]
    },
    'creep-green-3': { // timings for buggers
        spriteCount: 4,
        spriteTime: [1000, 200, 200, 200]
    },
    'creep-blue-3': {
        spriteCount: 4,
        spriteTime: [1000, 200, 200, 200]
    },
    'creep-yellow-3': {
        spriteCount: 4,
        spriteTime: [1000, 200, 200, 200]
    },
    'creep-red-3': {
        spriteCount: 4,
        spriteTime: [1000, 200, 200, 200]
    }
};

// Define properties of the tower types
let groundName = "Ground Cannon",
    bombName = "Bomb Launcher",
    airName = "Surface to Air Missle",
    mixedName = "Weapon of Mass Destruction";

MyGame.constants.towers = {
    assets: {},
    stats: {}
}
MyGame.constants.towers.assets[groundName] = [
    MyGame.assets['tower-ground-1'],
    MyGame.assets['tower-ground-2'],
    MyGame.assets['tower-ground-3']
];
MyGame.constants.towers.assets[bombName] = [
    MyGame.assets['tower-bomb-1'],
    MyGame.assets['tower-bomb-2'],
    MyGame.assets['tower-bomb-3']
];
MyGame.constants.towers.assets[airName] = [
    MyGame.assets['tower-air-1'],
    MyGame.assets['tower-air-2'],
    MyGame.assets['tower-air-3']
];
MyGame.constants.towers.assets[mixedName] = [
    MyGame.assets['tower-mixed-1'],
    MyGame.assets['tower-mixed-2'],
    MyGame.assets['tower-mixed-3']
];

MyGame.constants.towers.stats[groundName] = [
    { range: 200, damage: 20, cost: 20 },
    { range: 110, damage: 25, cost: 15 },
    { range: 125, damage: 35, cost: 20 }
];
MyGame.constants.towers.stats[bombName] = [
    { range: 75, damage: 50, cost: 75 },
    { range: 85, damage: 60, cost: 20 },
    { range: 100, damage: 75, cost: 25 }
];
MyGame.constants.towers.stats[airName] = [
    { range: 100, damage: 30, cost: 90 },
    { range: 125, damage: 40, cost: 30 },
    { range: 150, damage: 50, cost: 35 }
];
MyGame.constants.towers.stats[mixedName] = [
    { range: 175, damage: 75, cost: 150 },
    { range: 190, damage: 85, cost: 50 },
    { range: 220, damage: 100, cost: 75 }
];

MyGame.constants.towers.ground = {
    type: groundName,
    cost: MyGame.constants.towers.stats[groundName][0].cost,
    targets: "Ground only",
    dps: MyGame.constants.towers.stats[groundName][0].damage,
    range: MyGame.constants.towers.stats[groundName][0].range,
    notes: "This is the standard ground cannon. Deal damage to only ground targets."
}

MyGame.constants.towers.bomb = {
    type: bombName,
    cost: MyGame.constants.towers.stats[bombName][0].cost,
    targets: "Ground only",
    dps: MyGame.constants.towers.stats[bombName][0].damage,
    range: MyGame.constants.towers.stats[bombName][0].range,
    notes: "Does splash damage to ground targets."
}
MyGame.constants.towers.air = {
    type: airName,
    cost: MyGame.constants.towers.stats[airName][0].cost,
    targets: "Air only",
    dps: MyGame.constants.towers.stats[airName][0].damage,
    range: MyGame.constants.towers.stats[airName][0].range,
    notes: "This is an anti air weapon. Only fires at air targets."
}
MyGame.constants.towers.mixed = {
    type: mixedName,
    cost: MyGame.constants.towers.stats[mixedName][0].cost,
    targets: "Ground and Air",
    dps: MyGame.constants.towers.stats[mixedName][0].damage,
    range: MyGame.constants.towers.stats[mixedName][0].range,
    notes: "A truly deadly weapon. Can destory any target."
}


MyGame.constants.border = {};
MyGame.constants.border.corners = [
    { x: 1, y: 1, rotation: 90, image: 'bkgd-corner' },
    { x: 17, y: 1, rotation: 180, image: 'bkgd-corner' },
    { x: 1, y: 17, rotation: 0, image: 'bkgd-corner' },
    { x: 17, y: 17, rotation: -90, image: 'bkgd-corner' }
];
MyGame.constants.border.horiz = [
    { x: 2, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 3, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 4, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 5, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 6, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 12, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 13, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 14, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 15, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 16, y: 1, rotation: 0, image: 'bkgd-horiz' },
    { x: 2, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 3, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 4, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 5, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 6, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 12, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 13, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 14, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 15, y: 17, rotation: 0, image: 'bkgd-horiz' },
    { x: 16, y: 17, rotation: 0, image: 'bkgd-horiz' }
];
MyGame.constants.border.vert = [
    { x: 1, y: 2, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 3, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 4, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 5, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 6, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 2, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 3, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 4, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 5, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 6, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 16, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 15, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 14, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 13, rotation: 90, image: 'bkgd-horiz' },
    { x: 1, y: 12, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 16, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 15, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 14, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 13, rotation: 90, image: 'bkgd-horiz' },
    { x: 17, y: 12, rotation: 90, image: 'bkgd-horiz' }
];

let safeSpots = {
    "9,0": { x: 9, y: 0 },
    "0,9": { x: 0, y: 9 },
    "18,9": { x: 18, y: 9 },
    "9,18": { x: 9, y: 18 }
};
MyGame.constants.border.misc = [];
for (let y = 0; y < MyGame.constants.gridDim; y++) {
    for (let x = 0; x < MyGame.constants.gridDim; x++) {
        if (!(x + "," + y in safeSpots)) {
            if (y == 0 || (y == 18) || x == 0 || x == 18) {
                MyGame.constants.border.misc.push({ x: x, y: y });
            }
        }
    }
}
safeSpots = null;