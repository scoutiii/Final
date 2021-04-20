MyGame.systems.projectiles = function(spec) {
    let that = {};
    that.projectiles = {};
    that.nextName = 1;

    that.targetMatrix = spec.targetMatrix;


    function update(elapsedTime) {
        updateProjectiles(elapsedTime);

    }

    function updateProjectiles(elapsedTime) {
        let toDelete = [];

        for (let id in that.projectiles) {
            let p = that.projectiles[id];
            if (p.type == "mixed") {
                p.direction = {
                    dx: p.target.x - p.center.x,
                    dy: p.target.y - p.center.y
                };
                let mag = Math.hypot(target.x - center.x, target.y - center.y);
                p.direction.dx /= mag;
                p.direction.dy /= mag;
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

    function groundProjectile(center, target, speed) {
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
            }
        };
    }

    function bombProjectile(center, target) {

    }

    function airProjectile(center, target) {

    }

    function mixedProjectile(center, target, side) {

    }

    return {
        update,
        groundProjectile,
        get projectiles() { return that.projectiles; }
    }
}