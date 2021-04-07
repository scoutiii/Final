MyGame.objects.tower = function(spec) {
    let that = {};
    that.name = "tower";
    that.level = spec.level;
    that.type = spec.type;
    that.position = spec.position;
    that.showRadius = true;
    that.rotation = 0;

    updateStats(that.level);

    function updateStats(level) {
        that.level = level
        that.image = MyGame.constants.towers.assets[that.type][that.level];
        that.radius = MyGame.constants.towers.stats[that.type][that.level].range;
        that.damage = MyGame.constants.towers.stats
    }

    function update(elapsedTime) {

    }

    function upgrade() {

    }

    function sell() {

    }

    return {
        update,
        upgrade,
        sell,
        get name() { return that.name },
        get radius() { return { radius: that.radius, show: that.showRadius }; },
        set showRadius(val) { that.showRadius = val; },
        get position() { return that.position; },
        set position(position) { that.position = position; },
        get image() { return that.image; },
        get rotation() { return that.rotation; },
        set rotation(rot) { that.rotation = rot; }
    }
}