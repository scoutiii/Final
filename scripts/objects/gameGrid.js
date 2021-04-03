MyGame.objects.gameGrid = function(spec) {
    // Sets up the gameGrid
    let grid = new Array(spec.height);
    for (let i = 0; i < spec.dimension; i++) {
        grid[i] = new Array(spec.dimension);
    }
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x] = {
                object: null,
                center: {
                    x: spec.gridSize.width * (x + .5),
                    y: spec.gridSize.height * (y + .5)
                },
                size: spec.gridSize
            }
        }
    }

    // Adds the border pieces
    for (key in spec.border) {
        let border = spec.border[key];
        border.object.center = {
            x: spec.gridSize.width * (border.x + .5),
            y: spec.gridSize.height * (border.y + .5)
        };
        border.object.size = spec.gridSize;
        updateGridCell(border.x,
            border.y,
            border,
            0);
    }

    // Updates the spec at the given coordinate
    function updateGridCell(x, y, spec, elapsedTime) {
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