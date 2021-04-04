MyGame.objects.tower = function(spec) {
    let that = {};
    that.level = spec.level;
    that.name = spec.name;

    that.image = MyGame.constants.towers[that.name][that.level];
}