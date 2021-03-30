MyGame.systems.render.gameModel = (function(graphics, constants) {

    function render(spec) {
        graphics.drawText(spec.time, "12pt Arial",
            "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)", { x: constants.globalSize / 2, y: constants.globalSize / 2 },
            0, constants.textOptions.baseline.middle, constants.textOptions.align.center);
    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants));