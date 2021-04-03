MyGame.systems.render.fps = (function(graphics, textOptions) {
    function render(spec) {
        // shows the fps in the top corner
        graphics.drawText("FPS: " + spec.lastFPS, "12pt Arial",
            "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 0)", { x: 0, y: 0 },
            0, textOptions.baseline.top, textOptions.align.right);
    }

    return {
        render
    }
}(MyGame.systems.graphics, MyGame.constants.textOptions));