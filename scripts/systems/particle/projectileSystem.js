MyGame.systems.projectiles = function(spec) {
    let that = {};
    that.projectiles = {};
    that.nextName = 1;

    that.targetMatrix = spec.targetMatrix;


    function update(elapsedTime) {
        updateProjectiles(elapsedTime);
        collideParticles(elapsedTime);
    }

    function collideParticles(elapsedTime) {

    }

    // checks how close
    function withIn(a, b, tolerance = 5) {
        return Math.abs(a.x - b.x) <= tolerance && Math.abs(a.y - b.y) <= tolerance;
    }

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
                if (withIn(p.center, p.target)) {
                    toDelete.push(id);
                    p.onExplosion();
                }
            }
            if (p.type == "bomb") {
                if (withIn(p.center, p.target)) {
                    toDelete.push(id);
                    p.onExplosion();
                }
            }
            p.center.x += p.direction.dx * p.speed * elapsedTime;
            p.center.y += p.direction.dy * p.speed * elapsedTime;

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
        that.projectiles[that.nextName++] = {
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
            onCollision: function() {
                // calculate damage
            },
            damage: damage
        };
    }

    function bombProjectile(center, target, speed) {
        let mag = Math.hypot(target.x - center.x, target.y - center.y);
        that.projectiles[that.nextName++] = {
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
                // add particles, calculate damage
            }
        };
    }

    function airProjectile(center, target, speed, damage) {
        let mag = Math.hypot(target.x - center.x, target.y - center.y);
        that.projectiles[that.nextName++] = {
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
            onExplosion: function() {
                // add particles, calculate damage
            },
            damage: damage
        };
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
                // calculate damage
            },
            damage: damage
        };
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