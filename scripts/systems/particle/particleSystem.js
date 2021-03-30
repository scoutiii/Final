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

            particle.rotation += particle.speed / 500;

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
            let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.std));
            let p = {
                center: spec.center,
                size: { width: size, height: size },
                direction: Random.nextCircleVector(spec.direction - spec.spread, spec.direction + spec.spread),
                speed: Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.std)),
                rotation: 0,
                lifeTime: Math.abs(Random.nextGaussian(spec.lifeTime.mean, spec.lifeTime.std)),
                alive: 0,
                globalSize: spec.globalSize,
                type: type
            };
            particles[nextName++] = p;
        }
    }


    return {
        update,
        addParticles,
        get particles() { return particles; }
    }
}