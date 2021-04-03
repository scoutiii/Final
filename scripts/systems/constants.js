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
MyGame.constants.towers = Object.freeze({
    ground: {
        name: "Ground Cannon",
        cost: 20,
        type: "Ground only",
        dps: 20,
        range: 100,
        notes: "This is the standard ground cannon. Deal damage to only ground targets."
    },
    bomb: {
        name: "Bomb Launcher",
        cost: 75,
        type: "Ground only",
        dps: 50,
        range: 150,
        notes: "Does splash damage to ground targets."
    },
    air: {
        name: "Surface to Air Missle",
        cost: 100,
        type: "Air only",
        dps: 30,
        range: 200,
        notes: "This is an anti air weapon. Only fires at air targets."
    },
    mixed: {
        name: "Weapon of Mass Destruction",
        cost: 150,
        type: "Ground and Air",
        dps: 75,
        range: 175,
        notes: "A truly deadly weapon. Can destory any target."
    }
})