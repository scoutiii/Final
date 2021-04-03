MyGame.objects.border = function(spec) {
    let info = {};
    info.image = null;
    info.rotation = 0;
    info.center = null;
    info.size = null;
    for (item in spec) {
        info[item] = spec[item];
    }

    return {
        get name() { return "border"; },
        get image() { return info.image },
        get rotation() { return info.rotation },
        get center() { return info.center },
        get size() { return info.size },
        set center(center) { info.center = center; },
        set size(size) { info.size = size; },
        update(elapsedTime) {}
    }
}