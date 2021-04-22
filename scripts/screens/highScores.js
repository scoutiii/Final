MyGame.screens[MyGame.constants.screens.highScores] = (function(screenManager, screens) {

    function initialize() {
        console.log("initialize: highScores");

        document.getElementById("highScoresBackButton").addEventListener(
            "click",
            function() { screenManager.showScreen(screens.mainMenu); }
        );

        // gets highscores
        MyGame.misc.highScores = [];
        let previousScores = localStorage.getItem("highScores");
        if (previousScores != null) {
            MyGame.misc.highScores = JSON.parse(previousScores);
        }
    }

    function run() {
        console.log("run: highScores");

        MyGame.misc.highScores.sort(function(a, b) { return b - a; });

        let toPrint = MyGame.misc.highScores.slice(0, 5);
        document.getElementById("highScoresList").innerHTML = "";
        for (let i = 0; i < toPrint.length; i++) {
            let line = "<li>" + toPrint[i] + "</li>";
            document.getElementById("highScoresList").innerHTML += line;
        }
    }

    return {
        initialize,
        run
    }
}(MyGame.screenManager, MyGame.constants.screens));