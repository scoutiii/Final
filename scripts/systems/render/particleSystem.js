MyGame.systems.render.particleSystem = (function(graphics, constants) {
    let p = null;

    function render(spec) {
        for (let id in spec.particles) {
            p = spec.particles[id];
            if (p.type == "creepDeath") {
                renderCreepDeath(p);
            } else if (p.type == "creepScore") {
                renderCreepScore(p);
            } else if (p.type == "bombSmoke") {
                renderBombSmoke(p);
            } else if (p.type == "explosion") {
                renderExplosion(p);
            } else if (p.type == "rocketSmoke") {
                renderRocketSmoke(p);
            } else if (p.type == "cashMoney") {
                renderCashMoney(p);
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
        graphics.drawTexture(
            MyGame.assets["bombSmoke"],
            spec.center,
            spec.rotation, { width: spec.size, height: spec.size }
        );
    }

    function renderExplosion(spec) {
        graphics.drawTexture(
            MyGame.assets["explosionSmoke"],
            spec.center,
            spec.rotation, { width: 1.5 * spec.size, height: 1.5 * spec.size }
        );
        graphics.drawTexture(
            MyGame.assets["explosion"],
            spec.center,
            spec.rotation, { width: spec.size, height: spec.size }
        );
    }

    function renderRocketSmoke(spec) {
        graphics.drawTexture(
            MyGame.assets["bombSmoke"],
            spec.center,
            spec.rotation, { width: spec.size, height: spec.size }
        );
        graphics.drawTexture(
            MyGame.assets["explosion"],
            spec.center,
            spec.rotation, { width: .9 * spec.size, height: .9 * spec.size }
        );
    }

    function renderCashMoney(spec) {
        graphics.drawTexture(
            MyGame.assets["cashMoney"],
            spec.center,
            spec.rotation, { width: spec.size, height: spec.size }
        );
    }

    return {
        render
    };
}(MyGame.systems.graphics, MyGame.constants));