MyGame.systems.render.gameGrid = (function(graphics, constants) {

    function render(spec) {
        for (let y = 0; y < spec.length; y++) {
            for (let x = 0; x < spec[y].length; x++) {
                if (spec[y][x].image != null) {
                    graphics.drawTexture(
                        spec[y][x].image,
                        spec[y][x].center,
                        spec[y][x].rotation,
                        spec[y][x].size
                    );
                }
            }
        }
    }

    return {
        render
    }
}(MyGame.systems.graphics, MyGame.constants));