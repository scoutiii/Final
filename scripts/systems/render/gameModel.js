MyGame.systems.render.gameModel = (function(graphics, constants, renderer) {

    function render(spec) {
        // Draws star background
        graphics.drawTexture(
            MyGame.assets['bkgd-stars'], { x: constants.globalSize.width / 2, y: constants.globalSize.height / 2 },
            0, constants.globalSize
        );

        // Draws grid lines
        if (spec.showGrid) {
            drawGridLines();
        }

        // Draws the border
        for (let i = 0; i < spec.border.length; i++) {
            renderer.border.render(spec.border[i]);
        }

        // Draws the towers
        for (let id in spec.towers) {
            renderer.tower.render(spec.towers[id]);
        }
        // Draws the creeps
        for (let id in spec.creeps) {
            renderer.creep.render(spec.creeps[id]);
        }
        // Renders projectiles
        renderer.projectileSystem.render(spec.projectiles);

        // Renders tower to place
        if (spec.towerToPlace != null) {
            renderer.tower.render(spec.towerToPlace.tower);
            if (!spec.showGrid) {
                drawGridLines();
            }
        }

        // If game is over
        if (spec.gameOver) {
            graphics.drawText(
                "Game Over!",
                "20pt Arial",
                "rgba(0, 255, 0, 1)",
                "rgba(0, 0, 0, 0)", {
                    x: constants.globalSize.width * .5,
                    y: constants.globalSize.height * .5
                },
                0,
                constants.textOptions.baseline.middle,
                constants.textOptions.align.center
            );

            graphics.drawText(
                "Use esc to leave.",
                "20pt Arial",
                "rgba(0, 255, 0, 1)",
                "rgba(0, 0, 0, 0)", {
                    x: constants.globalSize.width * .5,
                    y: constants.globalSize.height * .6
                },
                0,
                constants.textOptions.baseline.middle,
                constants.textOptions.align.center
            );
        }

    }

    function drawGridLines() {
        // Draws the grid lines
        for (let i = 0; i < constants.gridLines.y.length; i += 2) {
            graphics.drawLines([
                constants.gridLines.y[i],
                constants.gridLines.y[i + 1]
            ], "rgba(0,0,0,0)", "rgba(255, 255, 255, 1)", 1, "round");
            graphics.drawLines([
                constants.gridLines.x[i],
                constants.gridLines.x[i + 1]
            ], "rgba(0,0,0,0)", "rgba(255, 255, 255, 1)", 1, "round");
        }
    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants, MyGame.systems.render));