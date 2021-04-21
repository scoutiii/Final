MyGame.systems.render.particleSystem = (function(graphics, constants) {
    let p = null;

    function render(spec) {
        for (let id in spec.particles) {
            p = spec.particles[id];
            if (p.type == "creepDeath") {
                renderCreepDeath(p);
            } else if (p.type == "creepScore") {
                renderCreepScore(p);
            }
        }

    }

    function renderCreepDeath(spec) {
        graphics.drawTexture(
            MyGame.assets["creepDeath"],
            spec.center,
            spec.rotation, { width: spec.size, height: spec.size }
        );
    }

    function renderCreepScore(spec) {
        graphics.drawText("+" + spec.value,
            "12pt Arial",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 0)",
            spec.center,
            0,
            constants.textOptions.baseline.middle,
            constants.textOptions.align.center);
    }

    function renderBombSmoke(spec) {
        // graphics.drawTexture(
        //     MyGame.assets[]
        // )
    }

    return {
        render
    };
}(MyGame.systems.graphics, MyGame.constants));