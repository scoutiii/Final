MyGame.objects.gameGrid = function(spec) {
    let borders = {};
    for (let i = 0; i < spec.borders.length; i++) {
        borders[spec.borders[i].position.x + "," + spec.borders[i].position.y] = spec.borders[i];
    }

    let that = {};

    that.grid = [];
    for (let y = 0; y < spec.height; y++) {
        that.grid.push([]);
        for (let x = 0; x < spec.width; x++) {
            if (x + "," + y in borders) {
                that.grid[y].push(borders[x + "," + y]);
            } else {
                that.grid[y].push(null);
            }
        }
    }

    return {
        get grid() { return that.grid; }
    }
}