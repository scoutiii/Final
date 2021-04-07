// Constants to reference screens
MyGame.constants.screens = Object.freeze({
    mainMenu: "mainMenu",
    controlMenu: "controlMenu",
    credits: "credits",
    gamePlay: "gamePlay",
    highScores: "highScores",
    pauseMenu: "pauseMenu"
});

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