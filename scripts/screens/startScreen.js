MyGame.screens[MyGame.constants.screens.startScreen] = (function(screenManager, screens) {

    function initialize() {
        console.log("initialize: startScreen");

        document.getElementById("startButton").addEventListener(
            "click",
            function() {
                document.getElementById("backgroundMusic").play();
                screenManager.showScreen(screens.mainMenu);
            }
        );
    }

    function run() {
        console.log("run: startScreen");
    }

    return {
        initialize,
        run
    }

}(MyGame.screenManager, MyGame.constants.screens));