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

    function update(elapsedTime) {
        that.time += elapsedTime;
        // calculate score
    }

    function setDialog(message) {
        dialog.innerHTML = "";
        dialog.innerHTML = message;
    }

    return {
        get level() { return that.level; },
        get wave() { return that.wave; },
        get time() { return that.time; },
        get gold() { return that.gold; },
        get lives() { return that.lives; },
        get score() { return that.score; },
        update,
        setDialog
    }
}