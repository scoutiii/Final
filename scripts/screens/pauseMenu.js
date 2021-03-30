MyGame.screens[MyGame.constants.screens.pauseMenu] = (function(screenManager, screens) {
    function initialize() {
        console.log("initialize: pauseMenu");

        // Hooks up the quit button
        document.getElementById("quitButton").addEventListener(
            "click",
            function() {
                MyGame.misc.newGame = true;
                screenManager.showScreen(screens.mainMenu);
            }
        );

        // Hooks up the resume button
        document.getElementById("resumeButton").addEventListener(
            "click",
            function() {
                MyGame.misc.newGame = false;
                screenManager.showScreen(screens.gamePlay);
            }
        );
    }

    function run() {
        console.log("run: pauseMenu");
    }

    return {
        initialize,
        run
    }

}(MyGame.screenManager, MyGame.constants.screens));