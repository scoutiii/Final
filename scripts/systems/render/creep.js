MyGame.systems.render.creep = (function(graphics, constants) {
    function render(spec) {
        if (spec.health > 0) {
            let info = spec.animationInfo;
            graphics.drawSubTexture(info.image,
                info.subImageIndex,
                info.subTextureWidth,
                info.center,
                info.rotation,
                info.size);
        }
    }

    return {
        render
    }
}(MyGame.systems.graphics, MyGame.constants));