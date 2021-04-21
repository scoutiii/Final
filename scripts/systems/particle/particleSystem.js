MyGame.systems.particles = function() {
    let particles = {};
    let nextName = 1;

    function update(elapsedTime) {
        let removeMe = [];

        elapsedTime = elapsedTime / 1000;

        Object.getOwnPropertyNames(particles).forEach(function(value) {
            let particle = particles[value];

            particle.alive += elapsedTime;

            particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
            particle.center.y -= (elapsedTime * particle.speed * particle.direction.y);

            if (particle.type != "creepScore") {
                particle.rotation += particle.speed / 500;
            }

            if (particle.alive > particle.lifeTime) {
                removeMe.push(value);
            }
        });

        for (let i = 0; i < removeMe.length; i++) {
            delete particles[removeMe[i]];
        }
        removeMe.length = 0;

    }

    function addParticles(spec, type) {
        for (let i = 0; i < spec.numParticles; i++) {
            particles[nextName++] = {
                center: JSON.parse(JSON.stringify(spec.center)),
                size: Math.abs(Random.nextGaussian(spec.size.mean, spec.size.std)),
                direction: Random.nextCircleVector(spec.direction - spec.spread, spec.direction + spec.spread),
                speed: Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.std)),
                rotation: 0,
                lifeTime: Math.abs(Random.nextGaussian(spec.lifeTime.mean, spec.lifeTime.std)),
                alive: 0,
                type: type,
                value: spec.value
            };
        }
    }

    function onCreepDeath(center, value) {
        addParticles({
                numParticles: 20,
                center: center,
                size: { mean: 10, std: 5 },
                spread: 360,
                speed: { mean: 800, std: 50 },
                lifeTime: { mean: .05, std: .1 },
                direction: 0
            },
            "creepDeath");
        addParticles({
                numParticles: 1,
                center: center,
                size: { mean: 20, std: 0 },
                spread: 0,
                speed: { mean: 70, std: 0 },
                lifeTime: { mean: 1, std: 0 },
                direction: -90,
                value: value
            },
            "creepScore");
    }

    function bombSmoke(center, numParticles) {
        addParticles({
                numParticles,
                center,
                size: { mean: 5, std: 1 },
                spread: 360,
                speed: { mean: 10, std: 1 },
                lifeTime: { mean: .2, std: .1 },
                direction: 0
            },
            "bombSmoke");
    }

    function explosion(center) {
        addParticles({
                numParticles: 20,
                center: center,
                size: { mean: 20, std: 5 },
                spread: 360,
                speed: { mean: 300, std: 100 },
                lifeTime: { mean: .1, std: .1 },
                direction: 0
            },
            "explosion");
    }

    function rocketSmoke(center, numParticles, direction) {
        addParticles({
                numParticles,
                center,
                size: { mean: 20, std: 5 },
                spread: 30,
                speed: { mean: 50, std: 10 },
                lifeTime: { mean: .1, std: .1 },
                direction: direction
            },
            "rocketSmoke");
    }

    function onTowerSell(center, value) {
        addParticles({
                numParticles: value / 4,
                center,
                size: { mean: 20, std: 20 },
                spread: 360,
                speed: { mean: 50, std: 50 },
                lifeTime: { mean: .5, std: .1 },
                direction: 0
            },
            "cashMoney");
    }

    return {
        update,
        onCreepDeath,
        bombSmoke,
        explosion,
        rocketSmoke,
        onTowerSell,
        get particles() { return particles; }
    }
}