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

    // Checks to see if there is something in the placable area
    function canPlace(x, y, grid = false) {
        if (grid) {
            return that.grid[y][x] == null;
        }
        if (x < 2 * MyGame.constants.gridSize.width ||
            x > 17 * MyGame.constants.gridSize.width ||
            y < 2 * MyGame.constants.gridSize.height ||
            y > 17 * MyGame.constants.gridSize.height) {
            return false;
        } else {
            let col = Math.floor(y / MyGame.constants.gridSize.height);
            let row = Math.floor(x / MyGame.constants.gridSize.width);
            return that.grid[col][row] == null;
        }
    }

    function addElement(x, y, element) {
        that.grid[y][x] = element;
    }

    function removeElement(x, y) {
        that.grid[y][x] = null;
    }

    function getElement(x, y) {
        return that.grid[y][x];
    }

    return {
        get grid() { return that.grid; },
        canPlace,
        addElement,
        getElement,
        removeElement
    }
}