MyGame.systems.render.tower = (function(graphics, constants) {

    function render(spec) {
        if (spec.radius.show) {
            graphics.drawCircle(
                spec.center,
                spec.radius.radius,
                "rgba(150, 205, 50, .2)",
                "rgba(0, 255, 0, 1)"
            );
        }
        graphics.drawTexture(MyGame.assets['tower-base'],
            spec.center,
            0,
            constants.gridSize);
        graphics.drawTexture(spec.image,
            spec.center,
            spec.rotation,
            constants.gridSize);
    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants));