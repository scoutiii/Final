MyGame.screens[MyGame.constants.screens.mainMenu] = (function(screenManager, screens) {

    function initialize() {
        console.log("initialize: mainMenu");

        // Links to the new game screen
        document.getElementById("gamePlayButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.gamePlay); }
        );

        // Links to the high score screen
        document.getElementById("highScoresButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.highScores); }
        );

        // Links to the controls screen
        document.getElementById("controlMenuButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.controlMenu); }
        );

        // Links to the credits screen
        document.getElementById("creditsButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.credits); }
        );
    }

    function run() {
        console.log("run: mainMenu");
    }

    return {
        initialize,
        run
    }
}(MyGame.screenManager, MyGame.constants.screens));