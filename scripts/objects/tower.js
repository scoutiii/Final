MyGame.objects.tower = function(spec) {
    let that = {};
    that.name = "tower";
    that.id = spec.id;
    that.creeps = spec.creeps;
    that.level = spec.level;
    that.type = spec.type;
    that.value = 0;
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

    // projectiles
    that.projectiles = spec.projectiles;
    that.fireTime = 0;

    that.targetFunction = groundTargeting;
    that.projectileFunction = that.projectiles.groundProjectile;
    if (that.type == MyGame.constants.towers.air.type) {
        that.targetFunction = airTargeting;
        that.projectileFunction = that.projectiles.airProjectile;
    }
    if (that.type == MyGame.constants.towers.mixed.type) {
        that.targetFunction = mixedTargeting;
        that.projectileFunction = that.projectiles.mixedProjectile;
    }
    if (that.type == MyGame.constants.towers.bomb.type) {
        that.projectileFunction = that.projectiles.bombProjectile;
    }



    // Updates the stats based on the level
    function updateStats(level) {
        that.level = level
        that.image = MyGame.constants.towers.assets[that.type][that.level];
        that.radius = MyGame.constants.towers.stats[that.type][that.level].range;
        that.damage = MyGame.constants.towers.stats[that.type][that.level].damage;
        that.value += MyGame.constants.towers.stats[that.type][that.level].cost;
        that.speed = MyGame.constants.towers.stats[that.type][that.level].speed;
        that.fireRate = MyGame.constants.towers.stats[that.type][that.level].fireRate;
    }

    updateStats(that.level);


    // targeting related stuff
    that.targetMatrix = spec.targetMatrix;
    that.diff = Math.ceil((that.radius / MyGame.constants.gridSize.width) - .5);

    // Checks targest based on tower type
    function airTargeting(target) {
        if (target.type == "bugger") {
            return target;
        }
        return null;
    }

    // Checks targets based on ground towers
    function groundTargeting(target) {
        if (target.type == "grunt" || target.type == "hunter") {
            return target;
        }
        return null;
    }

    function mixedTargeting(target) {
        return target;
    }

    // Goes through the target matrix to find a target
    function findTarget() {
        for (let y = that.gridPosition.y - that.diff; y <= that.gridPosition.y + that.diff; y++) {
            for (let x = that.gridPosition.x - that.diff; x <= that.gridPosition.x + that.diff; x++) {
                if (x >= 0 && x < that.targetMatrix.length &&
                    y >= 0 && y < that.targetMatrix.length) {
                    // Loops through the creeps
                    for (id in that.targetMatrix[y][x]) {
                        that.target = that.targetMatrix[y][x][id];
                        if (Math.hypot(that.center.x - that.target.center.x,
                                that.center.y - that.target.center.y) <= that.radius) {
                            if (that.targetFunction(that.target) != null) {
                                return that.target;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    function crossProduct2d(v1, v2) {
        return (v1.x * v2.y) - (v1.y * v2.x);
    }

    function computeAngle(rotation, ptCenter, ptTarget) {
        let v1 = {
                x: Math.cos(rotation),
                y: Math.sin(rotation)
            },
            v2 = {
                x: ptTarget.x - ptCenter.x,
                y: ptTarget.y - ptCenter.y
            },
            dp,
            angle;

        v2.len = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        v2.x /= v2.len;
        v2.y /= v2.len;

        dp = v1.x * v2.x + v1.y * v2.y;
        angle = Math.acos(dp);

        cp = crossProduct2d(v1, v2);

        return {
            angle: angle,
            crossProduct: cp
        };
    }

    function testTolerance(value, test, tolerance) {
        return Math.abs(value - test) < tolerance
    }

    // Update function
    function update(elapsedTime) {
        if (that.target == null) {
            that.target = findTarget();
        } else {
            // removes target if it is out of range
            if (Math.hypot(that.center.x - that.target.center.x,
                    that.center.y - that.target.center.y) > that.radius ||
                that.creeps[that.target.id] == undefined) {
                that.target = null;
            } else { // Rotates turret
                let result = computeAngle(that.rotation, that.center, that.target.center);
                if (testTolerance(result.angle, 0, .01) === false) {
                    if (result.crossProduct > 0) {
                        that.rotation += elapsedTime * MyGame.constants.towers.rotationRate;
                    } else {
                        that.rotation -= elapsedTime * MyGame.constants.towers.rotationRate;
                    }
                }
                that.fireTime += elapsedTime;
                if (that.fireTime >= that.fireRate) {
                    that.fireTime %= that.fireRate;
                    that.projectileFunction(that.center, that.target.center, that.speed, that.damage, that.rotation);
                }
            }
        }
    }

    // upgrades the tower
    function upgrade() {
        updateStats(that.level + 1);
    }

    // Sets the position (mostly for placing a tower)
    function setPosition(pos) {
        that.center = {
            x: (pos.x - (pos.x % MyGame.constants.gridSize.width)) + (MyGame.constants.gridSize.width / 2),
            y: (pos.y - (pos.y % MyGame.constants.gridSize.height)) + (MyGame.constants.gridSize.height / 2)
        };
        if (that.center.x < MyGame.constants.border.interior.lower * MyGame.constants.gridSize.width ||
            that.center.x > MyGame.constants.border.interior.upper * MyGame.constants.gridSize.width ||
            that.center.y < MyGame.constants.border.interior.lower * MyGame.constants.gridSize.height ||
            that.center.y > MyGame.constants.border.interior.upper * MyGame.constants.gridSize.height) {
            that.color = "rgba(255, 0, 0, .2)";
        } else {
            that.color = "rgba(150, 205, 50, .2)";
        }
    }

    return {
        update,
        upgrade,
        get name() { return that.name },
        get radius() { return { radius: that.radius, show: that.showRadius, color: that.color }; },
        set showRadius(val) { that.showRadius = val; },
        get center() { return that.center; },
        set center(pos) { setPosition(pos); },
        get gridPosition() { return that.gridPosition; },
        get image() { return that.image; },
        get rotation() { return (that.rotation * 180 / Math.PI) + 90; },
        set rotation(rot) { that.rotation = rot; },
        get id() { return that.id; },
        get type() { return that.type; },
        get value() { return Math.floor(.9 * that.value); },
        get damage() { return that.damage; },
        get range() { return that.radius; },
        get level() { return that.level; }
    }
}