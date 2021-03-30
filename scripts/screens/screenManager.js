// Manages all the game screen states
MyGame.screenManager = (function(screens) {

    // given an ID, it deactivates the other screens, and activates the desired screen
    function showScreen(id) {
        let active = document.getElementsByClassName('active');
        for (let screen = 0; screen < active.length; screen++) {
            active[screen].classList.remove('active');
        }
        screens[id].run();
        document.getElementById(id).classList.add('active');
    }

    // Initializes the game stuff, and show the main menu
    function initialize(firstScreen) {
        let screen = null;

        for (screen in screens) {
            if (screens.hasOwnProperty(screen)) {
                screens[screen].initialize();
            }
        }

        showScreen(firstScreen);
    }

    return {
        initialize,
        showScreen
    }

}(MyGame.screens));