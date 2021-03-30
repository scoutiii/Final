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
MyGame.constants.globalSize = 1000;
MyGame.constants.canvasMenuScaleFactor = {
    width: MyGame.constants.canvasScaleFactor / 2,
    height: MyGame.constants.canvasScaleFactor
};
MyGame.constants.menuGlobalSize = {
    width: MyGame.constants.globalSize / 2,
    height: MyGame.constants.globalSize
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