MyGame.systems.render.gameModel = (function(graphics, constants, renderer) {

    function render(spec) {

        graphics.drawTexture(
            spec.gameGrid.background, { x: constants.globalSize / 2, y: constants.globalSize / 2 },
            0, { width: constants.globalSize, height: constants.globalSize }
        );
        renderer.gameGrid.render(spec.gameGrid.grid);
    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants, MyGame.systems.render));