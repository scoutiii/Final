MyGame.systems.render.creep = (function(graphics, constants) {
    function render(spec) {
        if (spec.health > 0) {
            let info = spec.animationInfo;

            graphics.drawSubTexture(info.image,
                info.subImageIndex,
                info.subTextureWidth,
                info.center,
                info.rotation,
                info.size);

            let corner = {
                x: spec.center.x - (MyGame.constants.gridSize.width / 2),
                y: spec.center.y - (MyGame.constants.gridSize.height / 2)
            };

            graphics.drawRectangle(corner,
                MyGame.constants.gridSize.width,
                MyGame.constants.gridSize.height * .05,
                "rgba(0, 255, 0, 1)");

            corner.x += MyGame.constants.gridSize.width * (spec.health / spec.maxHealth);

            graphics.drawRectangle(corner,
                MyGame.constants.gridSize.width * (1 - (spec.health / spec.maxHealth)),
                MyGame.constants.gridSize.height * .05,
                "rgba(255, 0, 0, 1)");

            // Draws the colliding box
            // graphics.drawLines(
            //     [{ x: spec.left, y: spec.top },
            //         { x: spec.right, y: spec.top },
            //         { x: spec.right, y: spec.bottom },
            //         { x: spec.left, y: spec.bottom }
            //     ],
            //     "rgba(0, 0, 0, 0)",
            //     "rgba(255, 255, 255, 1)",
            //     1
            // );
        }
    }

    return {
        render
    }
}(MyGame.systems.graphics, MyGame.constants));