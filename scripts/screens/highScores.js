MyGame.screens[MyGame.constants.screens.highScores] = (function(screenManager, screens) {

    function initialize() {
        console.log("initialize: highScores");

        document.getElementById("highScoresBackButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.mainMenu); }
        );
    }

    function run() {
        console.log("run: highScores");
    }

    return {
        initialize,
        run
    }
}(MyGame.screenManager, MyGame.constants.screens));