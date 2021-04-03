MyGame.objects.gameGrid = function(spec) {
    // Sets up the gameGrid
    let grid = new Array(spec.height);
    for (let i = 0; i < spec.width; i++) {
        grid[i] = new Array(spec.width);
    }
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = {
                image: null,
                rotation: 0,
                center: {
                    x: spec.gridSize * (x + .5),
                    y: spec.gridSize * (y + .5)
                },
                size: {
                    width: spec.gridSize,
                    height: spec.gridSize
                }
            }
        }
    }

    // Adds the border pieces
    for (border in spec.border) {
        updateGridCell(spec.border[border].x,
            spec.border[border].y,
            spec.border[border].spec)
    }

    // Updates the spec at the given coordinate
    function updateGridCell(x, y, spec) {
        for (item in spec) {
            grid[y][x][item] = spec[item];
        }
    }

    return {
        get grid() { return grid; },
        get background() { return spec.background; },
        updateGridCell
    }
}