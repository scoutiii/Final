MyGame.objects.inGameMenu = function(spec) {
    let that = {}
    that.level = spec.level;
    that.wave = spec.wave;
    that.time = spec.time;
    that.gold = spec.gold;
    that.lives = spec.lives;
    that.score = 0;
    let dialog = document.getElementById("dialog");
    let towers = MyGame.constants.towers;

    function onTowerHover(spec) {
        let message = "";
        message += "Tower: " + spec.name;
        message += "<br>Cost: " + spec.cost;
        message += "<br>Type: " + spec.type;
        message += "<br>DPS: " + spec.dps;
        message += "<br>Range: " + spec.range;
        message += "<br>Notes: " + spec.notes;
        setDialog(message);
    }

    // Sets up the mouse hover functions
    document.getElementById("ground").onmouseover = function() {
        onTowerHover(towers.ground);
    }
    document.getElementById("bomb").onmouseover = function() {
        onTowerHover(towers.bomb)
    };
    document.getElementById("air").onmouseover = function() {
        onTowerHover(towers.air);
    }
    document.getElementById("mixed").onmouseover = function() {
        onTowerHover(towers.mixed)
    };

    document.getElementById("nextWaveButton").addEventListener(
        "click",
        spec.onNextWave
    );

    function updateStatus() {
        document.getElementById("level").innerHTML = "level: " + that.level;
        document.getElementById("wave").innerHTML = "wave: " + that.wave;
        document.getElementById("time").innerHTML = "time: " + millisToMinutesAndSeconds(that.time);
        document.getElementById("score").innerHTML = "score: " + that.score;
        document.getElementById("gold").innerHTML = "gold: " + that.gold;
        document.getElementById("lives").innerHTML = "lives: " + that.lives;
    }
    updateStatus();

    // Got this from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    function update(elapsedTime) {
        that.time += elapsedTime;
        // calculate score
    }

    function setDialog(message) {
        dialog.innerHTML = message;
    }



    return {
        get level() { return that.level; },
        get wave() { return that.wave; },
        get time() { return that.time; },
        get gold() { return that.gold; },
        get lives() { return that.lives; },
        get score() { return that.score; },
        set level(level) {
            that.level += level;
            updateStatus();
        },
        set wave(wave) {
            that.wave += wave;
            updateStatus();
        },
        set time(time) {
            that.time += time;
            updateStatus();
        },
        set gold(gold) {
            that.gold += gold;
            updateStatus();
        },
        set lives(lives) {
            that.lives += lives;
            updateStatus();
        },
        set score(score) {
            that.score += score;
            updateStatus();
        },
        update,
        setDialog,
        updateStatus
    }
}