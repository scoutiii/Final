MyGame.screens[MyGame.constants.screens.controlMenu] = (function(screenManager, screens) {

    function initialize() {
        console.log("initialize: controlMenu");

        document.getElementById("controlMenuBackButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.mainMenu); }
        );

        let previousControls = localStorage.getItem(MyGame.constants.controls);
        if (previousControls != null) {
            MyGame.misc.controls = JSON.parse(previousControls);
        }
    }

    function input(id, control, message) {
        let button = document.getElementById(id);
        button.innerHTML = "Press one key";
        button.style.backgroundColor = "rgba(0, 255, 0)";
        window.addEventListener(
            "keydown",
            function(e) {
                MyGame.misc.controls[control] = e.key;
                button.innerHTML = message + MyGame.misc.controls[control];
                localStorage[MyGame.constants.controls] = JSON.stringify(MyGame.misc.controls);
                button.style.backgroundColor = "black";
            }, { once: true }
        );
    }

    function run() {
        console.log("run: controlMenu");

        let sellButton = document.getElementById("sellButton");
        let upgradeButton = document.getElementById("upgradeButton");
        let nextWaveButton = document.getElementById("nextLevelButton");

        sellButton.innerHTML = "Sell: " + MyGame.misc.controls.sell;
        upgradeButton.innerHTML = "Upgrade: " + MyGame.misc.controls.upgrade;
        nextWaveButton.innerHTML = "Next Level: " + MyGame.misc.controls.nextLevel;

        sellButton.style.backgroundColor = "black";
        upgradeButton.style.backgroundColor = "black";
        nextWaveButton.style.backgroundColor = "black";

        sellButton.addEventListener(
            "click",
            function() {
                input("sellButton", "sell", "Sell: ");
            }
        );
        upgradeButton.addEventListener(
            "click",
            function() {
                input("upgradeButton", "upgrade", "Upgrade: ");
            }
        );
        nextWaveButton.addEventListener(
            "click",
            function() {
                input("nextLevelButton", "nextLevel", "Next level: ");
            }
        );
    }

    return {
        initialize,
        run
    }
}(MyGame.screenManager, MyGame.constants.screens));