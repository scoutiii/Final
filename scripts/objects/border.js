MyGame.objects.border = function(spec) {
    let info = {
        image: null,
        rotation: null,
        center: null,
        size: null
    };

    let types = ["corners", "horiz", "vert"];
    let found = false;
    for (let i = 0; i < types.length && !found; i++) {
        let filtered = MyGame.constants.border[types[i]].filter(function(cord) {
            return cord.x == spec.x && cord.y == spec.y;
        });
        if (filtered.length > 0) {
            found = true;
            info.image = MyGame.assets[filtered[0].image];
            info.rotation = filtered[0].rotation;
            info.size = MyGame.constants.gridSize;
            info.center = {
                x: info.size.width * (filtered[0].x + 0.5),
                y: info.size.height * (filtered[0].y + 0.5)
            };
        }
    }


    return {
        get name() { return "border"; },
        get image() { return info.image },
        get rotation() { return info.rotation },
        get center() { return info.center },
        get size() { return info.size }
    }
}