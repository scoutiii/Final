MyGame.screens[MyGame.constants.screens.controlMenu] = (function(screenManager, screens) {

    function initialize() {
        console.log("initialize: controlMenu");

        document.getElementById("controlMenuBackButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.mainMenu); }
        );
    }

    function run() {
        console.log("run: controlMenu");
    }

    return {
        initialize,
        run
    }
}(MyGame.screenManager, MyGame.constants.screens));