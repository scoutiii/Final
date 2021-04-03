MyGame.systems.render.gameModel = (function(graphics, constants, renderer) {

    function render(spec) {

        graphics.drawTexture(
            spec.gameGrid.background, { x: constants.globalSize.width / 2, y: constants.globalSize.height / 2 },
            0, constants.globalSize
        );
        renderer.gameGrid.render(spec.gameGrid.grid);
        let creeps = spec.creeps;
        for (let i = 0; i < creeps.length; i++) {
            renderer.creep.render(creeps[i]);
        }

    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants, MyGame.systems.render));