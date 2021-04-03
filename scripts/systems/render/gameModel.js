MyGame.systems.render.gameModel = (function(graphics, constants, renderer) {

    function render(spec) {
        // Draws star background
        graphics.drawTexture(
            spec.gameGrid.background, { x: constants.globalSize.width / 2, y: constants.globalSize.height / 2 },
            0, constants.globalSize
        );
        // Draws the gameGrid (towers and border)
        renderer.gameGrid.render(spec.gameGrid.grid);
        // Draws the creeps
        let creeps = spec.creeps;
        for (let i = 0; i < creeps.length; i++) {
            renderer.creep.render(creeps[i]);
        }

    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants, MyGame.systems.render));