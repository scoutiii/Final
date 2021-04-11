MyGame.systems.render.border = (function(graphics, constants) {

    function render(spec) {
        if (spec.image != null) {
            graphics.drawTexture(spec.image,
                spec.center,
                spec.rotation,
                spec.size);
        }

    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants));