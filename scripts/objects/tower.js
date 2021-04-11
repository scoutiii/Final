MyGame.objects.tower = function(spec) {
    let that = {};
    that.name = "tower";
    that.id = spec.id;
    that.creeps = spec.creeps;
    that.level = spec.level;
    that.type = spec.type;
    // Center in game coordinates
    that.center = {
        x: MyGame.constants.gridSize.width * (spec.center.x + 0.5),
        y: MyGame.constants.gridSize.height * (spec.center.y + 0.5)
    };
    // Grid center
    that.gridPosition = spec.center;

    that.showRadius = spec.showRadius;
    if (that.showRadius == null) {
        that.showRadius = false;
    }
    that.color = "rgba(150, 205, 50, .2)";

    that.rotation = 0;
    that.target = null;

    updateStats(that.level);

    function updateStats(level) {
        that.level = level
        that.image = MyGame.constants.towers.assets[that.type][that.level];
        that.radius = MyGame.constants.towers.stats[that.type][that.level].range;
        that.damage = MyGame.constants.towers.stats
    }

    function update(elapsedTime) {
        if (that.target == null) {
            console.log("target acquired");
            that.target = that.creeps[0];
        }
        that.rotation += 1;
    }

    function upgrade() {

    }

    function sell() {

    }

    function setPosition(pos) {
        that.center = {
            x: (pos.x - (pos.x % MyGame.constants.gridSize.width)) + (MyGame.constants.gridSize.width / 2),
            y: (pos.y - (pos.y % MyGame.constants.gridSize.height)) + (MyGame.constants.gridSize.height / 2)
        };
        if (that.center.x < 2 * MyGame.constants.gridSize.width ||
            that.center.x > 17 * MyGame.constants.gridSize.width ||
            that.center.y < 2 * MyGame.constants.gridSize.height ||
            that.center.y > 17 * MyGame.constants.gridSize.height) {
            that.color = "rgba(255, 0, 0, .2)";
        } else {
            that.color = "rgba(150, 205, 50, .2)"
        }
    }

    return {
        update,
        upgrade,
        sell,
        get name() { return that.name },
        get radius() { return { radius: that.radius, show: that.showRadius, color: that.color }; },
        set showRadius(val) { that.showRadius = val; },
        get center() { return that.center; },
        set center(pos) { setPosition(pos); },
        get gridPosition() { return that.gridPosition; },
        get image() { return that.image; },
        get rotation() { return that.rotation; },
        set rotation(rot) { that.rotation = rot; },
        get id() { return that.id; }
    }
}