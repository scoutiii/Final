MyGame.objects.border = function(spec) {
    let that = {
        image: null,
        rotation: null,
        center: null,
        size: null
    };

    let types = ["corners", "horiz", "vert", "misc"];
    let found = false;
    for (let i = 0; i < types.length && !found; i++) {
        let filtered = MyGame.constants.border[types[i]].filter(function(cord) {
            return cord.x == spec.x && cord.y == spec.y;
        });
        if (filtered.length > 0) {
            found = true;
            that.image = MyGame.assets[filtered[0].image];
            that.rotation = filtered[0].rotation;
            that.size = MyGame.constants.gridSize;
            that.position = {
                x: filtered[0].x,
                y: filtered[0].y
            };
            that.center = {
                x: that.size.width * (that.position.x + 0.5),
                y: that.size.height * (that.position.y + 0.5)
            };
        }
    }


    return {
        get name() { return "border"; },
        get image() { return that.image },
        get rotation() { return that.rotation },
        get center() { return that.center },
        get position() { return that.position; },
        get size() { return that.size }
    }
}