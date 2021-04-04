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
    ground: {
        name: groundName,
        cost: 20,
        type: "Ground only",
        dps: 20,
        range: 100,
        notes: "This is the standard ground cannon. Deal damage to only ground targets."
    },
    bomb: {
        name: bombName,
        cost: 75,
        type: "Ground only",
        dps: 50,
        range: 150,
        notes: "Does splash damage to ground targets."
    },
    air: {
        name: airName,
        cost: 100,
        type: "Air only",
        dps: 30,
        range: 200,
        notes: "This is an anti air weapon. Only fires at air targets."
    },
    mixed: {
        name: mixedName,
        cost: 150,
        type: "Ground and Air",
        dps: 75,
        range: 175,
        notes: "A truly deadly weapon. Can destory any target."
    },
    assets: {}
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