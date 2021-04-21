MyGame.systems.projectiles = function(spec) {
    let that = {};
    that.projectiles = {};
    that.nextName = 1;

    that.targetMatrix = spec.targetMatrix;


    function update(elapsedTime) {
        updateProjectiles(elapsedTime);
        collideParticles();
    }

    function collideParticles() {
        let p = null;
        let intersected = false;
        let toDelete = [];
        for (let id in that.projectiles) {
            p = that.projectiles[id];

            let x = Math.floor(p.center.x / MyGame.constants.gridSize.width);
            let y = Math.floor(p.center.y / MyGame.constants.gridSize.height);
            intersected = false;
            for (let row = y - 1; row <= y + 1 && !intersected; row++) {
                for (let col = x - 1; col <= x + 1 && !intersected; col++) {
                    if (row >= 0 && row < that.targetMatrix.length &&
                        col >= 0 && col < that.targetMatrix.length) {
                        for (let creep in that.targetMatrix[row][col]) {
                            if (p.type == "bomb" && withIn(p.center, p.target)) {
                                that.targetMatrix[row][col][creep].health = p.damage;
                            } else if (p.type != "bomb") {
                                intersected = intersect(p, that.targetMatrix[row][col][creep]);
                                if (intersected) {
                                    that.targetMatrix[row][col][creep].health = p.damage;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (p.type == "bomb" && withIn(p.center, p.target)) {
                toDelete.push(id);
                p.onExplosion();
            } else if (intersected && p.type != "bomb") {
                toDelete.push(id);
                p.onCollision();
            }
        }

        for (let i = 0; i < toDelete.length; i++) {
            delete that.projectiles[toDelete[i]];
        }
    }

    // Checks if the bounding boxes collide
    function intersect(r1, r2) {
        return !(
            r2.left > r1.right ||
            r2.right < r1.left ||
            r2.top > r1.bottom ||
            r2.bottom < r1.top
        );
    }

    // checks how close
    function withIn(a, b, tolerance = 5) {
        return Math.abs(a.x - b.x) <= tolerance && Math.abs(a.y - b.y) <= tolerance;
    }

    // Updates the position of the particles
    function updateProjectiles(elapsedTime) {
        let toDelete = [];

        for (let id in that.projectiles) {
            let p = that.projectiles[id];
            if (p.type == "air") {
                p.direction = {
                    dx: p.target.x - p.center.x,
                    dy: p.target.y - p.center.y
                };
                let mag = Math.hypot(p.target.x - p.center.x, p.target.y - p.center.y);
                p.direction.dx /= mag;
                p.direction.dy /= mag;
            }
            p.center.x += p.direction.dx * p.speed * elapsedTime;
            p.center.y += p.direction.dy * p.speed * elapsedTime;

            // Updates hit box
            p.left = p.center.x - p.hitBox;
            p.right = p.center.x + p.hitBox;
            p.top = p.center.y - p.hitBox;
            p.bottom = p.center.y + p.hitBox;

            p.rotation = Math.atan2(p.direction.dy, p.direction.dx) * 180 / Math.PI - 90;

            // Removes projectile if it leaves the arena
            if (!(p.center.x < MyGame.constants.globalSize.width &&
                    p.center.x > 0 &&
                    p.center.y < MyGame.constants.globalSize.height &&
                    p.center.y > 0)) {
                toDelete.push(id);
            }
        }

        for (let i = 0; i < toDelete.length; i++) {
            delete that.projectiles[toDelete[i]];
        }

    }

    function groundProjectile(center, target, speed, damage) {
        let mag = Math.hypot(target.x - center.x, target.y - center.y);
        let p = {
            center: JSON.parse(JSON.stringify(center)),
            target: JSON.parse(JSON.stringify(target)),
            direction: {
                dx: (target.x - center.x) / mag,
                dy: (target.y - center.y) / mag
            },
            image: MyGame.assets['groundProj'],
            speed: speed,
            type: "ground",
            size: {
                width: 10,
                height: 10 * MyGame.assets['groundProj'].height / MyGame.assets['groundProj'].width
            },
            hitBox: 5,
            onCollision: function() {
                console.log("collided");
            },
            damage: damage
        };

        p.left = p.center.x - p.hitBox;
        p.right = p.center.x + p.hitBox;
        p.top = p.center.y - p.hitBox;
        p.bottom = p.center.y + p.hitBox;

        that.projectiles[that.nextName++] = p;
    }

    function bombProjectile(center, target, speed, damage) {
        let mag = Math.hypot(target.x - center.x, target.y - center.y);
        let p = {
            center: JSON.parse(JSON.stringify(center)),
            target: JSON.parse(JSON.stringify(target)),
            direction: {
                dx: (target.x - center.x) / mag,
                dy: (target.y - center.y) / mag
            },
            image: MyGame.assets['bombProj'],
            speed: speed,
            type: "bomb",
            size: {
                width: 40,
                height: 40 * MyGame.assets['bombProj'].height / MyGame.assets['bombProj'].width
            },
            onExplosion: function() {
                console.log("collided");
            },
            hitBox: 20,
            damage: damage
        };

        p.left = p.center.x - p.hitBox;
        p.right = p.center.x + p.hitBox;
        p.top = p.center.y - p.hitBox;
        p.bottom = p.center.y + p.hitBox;

        that.projectiles[that.nextName++] = p;
    }

    function airProjectile(center, target, speed, damage) {
        let mag = Math.hypot(target.x - center.x, target.y - center.y);
        let p = {
            center: JSON.parse(JSON.stringify(center)),
            target: target,
            direction: {
                dx: (target.x - center.x) / mag,
                dy: (target.y - center.y) / mag
            },
            image: MyGame.assets['missileProj'],
            speed: speed,
            type: "air",
            size: {
                width: 50,
                height: 50 * MyGame.assets['missileProj'].height / MyGame.assets['missileProj'].width
            },
            onCollision: function() {
                console.log("collided");

            },
            damage: damage,
            hitBox: 25
        };

        p.left = p.center.x - p.hitBox;
        p.right = p.center.x + p.hitBox;
        p.top = p.center.y - p.hitBox;
        p.bottom = p.center.y + p.hitBox;

        that.projectiles[that.nextName++] = p;
    }

    function mixedProjectile(center, target, speed, damage) {
        let mag = Math.hypot(target.x - center.x, target.y - center.y);
        let p = {
            center: JSON.parse(JSON.stringify(center)),
            target: JSON.parse(JSON.stringify(target)),
            direction: {
                dx: (target.x - center.x) / mag,
                dy: (target.y - center.y) / mag
            },
            image: MyGame.assets['mixedProj'],
            speed: speed,
            type: "mixed",
            size: {
                width: 10,
                height: 10 * MyGame.assets['mixedProj'].height / MyGame.assets['mixedProj'].width
            },
            onCollision: function() {
                console.log("collided");

            },
            damage: damage,
            hitBox: 5
        };

        p.left = p.center.x - p.hitBox;
        p.right = p.center.x + p.hitBox;
        p.top = p.center.y - p.hitBox;
        p.bottom = p.center.y + p.hitBox;

        that.projectiles[that.nextName++] = p;
    }

    return {
        update,
        groundProjectile,
        bombProjectile,
        airProjectile,
        mixedProjectile,
        get projectiles() { return that.projectiles; }
    }
}