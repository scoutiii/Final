// Spec needs 
// 1. type: name of asset (creep-blue-1)
// 2. center: {x: , y: } game coords
// 3. rotation: degrees,
// 4. health: what ever
MyGame.objects.creep = function(spec) {
    // Defines stuff for animated sprite
    let that = {};
    that.type = MyGame.constants.creeps[spec.name][spec.level];
    that.image = MyGame.assets[that.type];
    that.subTextureWidth = 0;
    that.spriteTime = [];
    that.spriteCount = 0;
    that.animationTime = 0;
    that.subImageIndex = 0;
    that.spriteCount = MyGame.constants.creeps.animation[that.type].spriteCount;
    that.spriteTime = MyGame.constants.creeps.animation[that.type].spriteTime;
    that.subTextureWidth = that.image.width / that.spriteCount;

    // Defines other attributes, where it spawns and ends
    that.subSpawn = Random.nextRange(0, 3);
    that.start = MyGame.constants.border.spawnPoints[spec.spawn][that.subSpawn];
    that.end = MyGame.constants.border.spawnPoints[(spec.spawn + 2) % 4][that.subSpawn];

    // Keeps the grid and finds it's path
    that.grid = spec.grid;
    if (spec.name != "bugger") {
        that.path = that.grid.findPath(that.start, that.end);
    } else {
        that.path = that.grid.findPathDirect(that.start, that.end);
    }
    that.target = 1;
    that.update = standardUpdate;

    // The center of the creep, starts at the spawn point
    that.center = {
        x: MyGame.constants.gridSize.width * (that.path[0].x + 0.5),
        y: MyGame.constants.gridSize.height * (that.path[0].y + 0.5)
    };

    // Tracks the rotation and direction
    that.rotation = spec.rotation - 90;
    that.direction = null;
    updateDirection(that.path[that.target]);

    // Tracks various stats about the creep
    that.size = MyGame.constants.gridSize;
    that.speed = MyGame.constants.creeps.stats[that.type].speed;
    that.maxHealth = MyGame.constants.creeps.stats[that.type].health;
    that.currentHealth = that.maxHealth;
    that.value = MyGame.constants.creeps.stats[that.type].value;

    that.outOfBounds = spec.outOfBounds;

    // Will change the rotation and direction based on the next path
    function updateDirection(target) {
        target = {
            x: MyGame.constants.gridSize.width * (target.x + 0.5),
            y: MyGame.constants.gridSize.height * (target.y + 0.5)
        };
        that.direction = {
            x: target.x - that.center.x,
            y: target.y - that.center.y
        };
        let magnitude = Math.sqrt(Math.pow(that.direction.x, 2) + Math.pow(that.direction.y, 2));
        that.direction.x /= magnitude;
        that.direction.y /= magnitude;

        that.rotation = Math.atan2(that.direction.y, that.direction.x) * 180 / Math.PI;
    }

    // Makes a new path for the creep
    function updatePath() {
        if (spec.name != "bugger") {
            that.update = findNewPathUpdate;
        }
    }

    // Checks if the creep is within the given x and y grid
    function withIn(spot, epsilon = 1) {
        let center = {
            x: MyGame.constants.gridSize.width * (spot.x + 0.5),
            y: MyGame.constants.gridSize.height * (spot.y + 0.5)
        };
        let diff = {
            x: Math.abs(center.x - that.center.x),
            y: Math.abs(center.y - that.center.y)
        };
        return diff.x <= epsilon && diff.y <= epsilon;
    }


    // Updates the animation state
    function updateAnimation(elapsedTime) {
        that.animationTime += elapsedTime;
        if (that.animationTime >= that.spriteTime[that.subImageIndex]) {
            that.animationTime -= that.spriteTime[that.subImageIndex];
            that.subImageIndex = (that.subImageIndex + 1) % that.spriteCount;
        }
    }

    // Updates the state of the creep
    function update(elapsedTime) {
        if (that.health <= 0) {
            return MyGame.constants.creeps.status.death;
        } else if (that.center.x < 0 || that.center.x > MyGame.constants.globalSize.width ||
            that.center.y < 0 || that.center.y > MyGame.constants.globalSize.height) {
            return MyGame.constants.creeps.status.outOfBounds;
        }
        updateAnimation(elapsedTime);
        return that.update(elapsedTime);
    }

    // Update function which follows the standard pathing
    function standardUpdate(elapsedTime) {
        that.center.x += that.direction.x * that.speed * elapsedTime;
        that.center.y += that.direction.y * that.speed * elapsedTime;
        if (withIn(that.path[that.target])) {
            that.target++;
            if (that.target >= that.path.length) {
                return MyGame.constants.creeps.status.success;
            }
            updateDirection(that.path[that.target]);
        }
        return MyGame.constants.creeps.status.normal;
    }

    function findNewPathUpdate(elapsedTime) {
        // Something is in the way
        if (that.grid.getElement(that.path[that.target].x, that.path[that.target].y) != null ||
            that.grid.getElement(that.path[that.target - 1].x, that.path[that.target - 1].y) != null) {
            that.target--;
        }
        let success = false;
        let path, start, end = null;
        while (!success) {
            start = that.grid.findPath(that.start, that.path[that.target]);
            if (start.length <= 1) {
                that.target++;
                continue;
            }
            end = that.grid.findPath(that.path[that.target], that.end);
            end.shift();
            path = start.concat(end);
            if (path.length > 2) {
                success = true;
            } else {
                that.target++;
            }
        }
        that.target = start.length - 1;
        that.path = path;
        updateDirection(that.path[that.target]);
        that.update = standardUpdate;
        return MyGame.constants.creeps.status.normal;
    }

    // All the stuff the creep returns
    return {
        get animationInfo() {
            return {
                image: that.image,
                subImageIndex: that.subImageIndex,
                subTextureWidth: that.subTextureWidth,
                center: that.center,
                rotation: that.rotation,
                size: that.size
            };
        },
        get health() { return that.currentHealth; },
        get value() { return that.value; },
        update,
        updatePath
    }

}