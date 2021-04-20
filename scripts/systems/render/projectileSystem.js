MyGame.systems.render.projectileSystem = (function(graphics, constants) {

    function render(spec) {
        for (let id in spec.projectiles) {
            graphics.drawTexture(
                spec.projectiles[id].image,
                spec.projectiles[id].center,
                spec.projectiles[id].rotation,
                spec.projectiles[id].size
            );
        }
    }

    return {
        render
    }
}(MyGame.systems.graphics, MyGame.constants));