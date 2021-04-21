MyGame.systems.render.projectileSystem = (function(graphics, constants) {
    let p = null;

    function render(spec) {
        for (let id in spec.projectiles) {
            p = spec.projectiles[id];
            graphics.drawTexture(
                p.image,
                p.center,
                p.rotation,
                p.size
            );
            // Draws the colliding box
            graphics.drawLines(
                [{ x: p.left, y: p.top },
                    { x: p.right, y: p.top },
                    { x: p.right, y: p.bottom },
                    { x: p.left, y: p.bottom }
                ],
                "rgba(0, 0, 0, 0)",
                "rgba(255, 255, 255, 1)",
                1
            );
        }
    }

    return {
        render
    }
}(MyGame.systems.graphics, MyGame.constants));