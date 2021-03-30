MyGame.screens[MyGame.constants.screens.credits] = (function(screenManager, screens) {

    function initialize() {
        console.log("initialize: credits");

        document.getElementById("creditsBackButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.mainMenu); }
        );
    }

    function run() {
        console.log("run: credits");
    }

    return {
        initialize,
        run
    }
}(MyGame.screenManager, MyGame.constants.screens));