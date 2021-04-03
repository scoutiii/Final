MyGame.systems.render.gameGrid = (function(graphics, constants, renderer) {

    function render(spec) {
        for (let y = 0; y < spec.length; y++) {
            for (let x = 0; x < spec[y].length; x++) {
                if (spec[y][x].object != null) {
                    renderer[spec[y][x].object.name].render(spec[y][x].object);
                }
            }
        }
    }

    return {
        render
    }
}(MyGame.systems.graphics, MyGame.constants, MyGame.systems.render));