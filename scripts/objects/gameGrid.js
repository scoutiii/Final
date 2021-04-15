MyGame.objects.gameGrid = function(spec) {
    // formats the border objects
    let borders = {};
    for (let i = 0; i < spec.borders.length; i++) {
        borders[spec.borders[i].position.x + "," + spec.borders[i].position.y] = spec.borders[i];
    }

    let that = {};
    // adds borders to the grid
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

    // Creates a graph
    that.graph = {};
    for (let y = 0; y < that.grid.length; y++) {
        for (let x = 0; x < that.grid[y].length; x++) {
            if (that.grid[y][x] == null) {
                let name = x + "," + y;
                that.graph[name] = {};
                // checks up
                if (y - 1 >= 0 && that.grid[y - 1][x] == null) {
                    that.graph[name][x + "," + (y - 1)] = 1;
                }
                // check down
                if (y + 1 < that.grid.length && that.grid[y + 1][x] == null) {
                    that.graph[name][x + "," + (y + 1)] = 1;
                }
                // checks left
                if (x - 1 >= 0 && that.grid[y][x - 1] == null) {
                    that.graph[name][(x - 1) + "," + y] = 1;
                }
                // check right
                if (x + 1 < that.grid[y].length && that.grid[y][x + 1] == null) {
                    that.graph[name][(x + 1) + "," + y] = 1;
                }
            }
        }
    }


    // takes the grid and turns it into a graph
    function updateGraph(x, y) {
        let name = x + "," + y;
        let node = that.graph[name];

        // Trying to delete the node
        if (that.grid[y][x] != null) {
            let nodes = Object.getOwnPropertyNames(node);
            for (let i = 0; i < nodes.length; i++) {
                delete that.graph[nodes[i]][name];
            }
            delete that.graph[name];
        } else { // Trying to add a new node
            that.graph[name] = {};
            // checks up
            if (y - 1 >= 0 && that.grid[y - 1][x] == null) {
                that.graph[name][x + "," + (y - 1)] = 1;
            }
            // check down
            if (y + 1 < that.grid.length && that.grid[y + 1][x] == null) {
                that.graph[name][x + "," + (y + 1)] = 1;
            }
            // checks left
            if (x - 1 >= 0 && that.grid[y][x - 1] == null) {
                that.graph[name][(x - 1) + "," + y] = 1;
            }
            // check right
            if (x + 1 < that.grid[y].length && that.grid[y][x + 1] == null) {
                that.graph[name][(x + 1) + "," + y] = 1;
            }
            // links the other ones back
            let nodes = Object.getOwnPropertyNames(that.graph[name]);
            for (let i = 0; i < nodes.length; i++) {
                that.graph[nodes[i]][name] = 1;
            }
        }
    }

    // Checks to see if there is something in the placable area
    function canPlace(x, y, grid) {
        if (grid) {
            if (x < MyGame.constants.border.interior.lower ||
                x >= MyGame.constants.border.interior.upper ||
                y < MyGame.constants.border.interior.lower ||
                y >= MyGame.constants.border.interior.upper) {
                return false;
            } else if (that.grid[y][x] != null) {
                return false;
            } else {
                return !blocksExits(x, y);
            }
        } else {
            return canPlace(
                Math.floor(x / MyGame.constants.gridSize.width),
                Math.floor(y / MyGame.constants.gridSize.height),
                true);
        }
    }

    // Checks to see if
    function blocksExits(x, y) {
        addElement(x, y, "not null lol");

        let spawnPoints = MyGame.constants.border.spawnPoints;
        let foundPath = true;
        for (let i = 1; i < spawnPoints.length && foundPath; i++) {
            let path = findPath(
                MyGame.constants.border.spawnPoints[0][1],
                MyGame.constants.border.spawnPoints[i][1]);
            if (path.length <= 1) {
                foundPath = false;
            }
        }
        removeElement(x, y);
        return !foundPath;
    }

    // Find a path from start to end
    // Adapted from https://levelup.gitconnected.com/finding-the-shortest-path-in-javascript-dijkstras-algorithm-8d16451eea34
    function findPath(start, end) {
        start = start.x + "," + start.y;
        end = end.x + "," + end.y;

        // tracks distances from the start node
        let distances = {};
        distances[end] = Infinity;
        distances = Object.assign(distances, that.graph[start]);

        // track paths
        let parents = { end: null };
        for (let child in that.graph[start]) {
            parents[child] = start;
        }

        // stores visited nodes
        let visited = [];

        // find the closest node
        let node = shortestDistanceNode(distances, visited);

        while (node) {
            // finds distance from start to its children
            let distance = distances[node];
            let children = that.graph[node];

            // goes through each child
            for (let child in children) {
                if (String(child) === String(start)) {
                    continue;
                } else {
                    let newDistance = distance + children[child];
                    if (!distances[child] || distances[child] > newDistance) {
                        distances[child] = newDistance;
                        parents[child] = node;
                    }
                }
            }
            visited.push(node);
            node = shortestDistanceNode(distances, visited);
        }

        // finds the shortest path
        let shortestPath = [end];
        let parent = parents[end];
        while (parent) {
            shortestPath.push(parent);
            parent = parents[parent];
        }
        shortestPath.reverse();

        for (let i = 0; i < shortestPath.length; i++) {
            let split = shortestPath[i].split(",");
            shortestPath[i] = {
                x: parseInt(split[0]),
                y: parseInt(split[1])
            };
        }

        return shortestPath;
    }

    // Helper function to find the node with the shortest distance
    function shortestDistanceNode(distances, visited) {
        let shortest = null;
        for (let node in distances) {
            let currentIsShortest = shortest === null || distances[node] < distances[shortest];
            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    }

    function addElement(x, y, element) {
        that.grid[y][x] = element;
        updateGraph(x, y);
    }

    function removeElement(x, y) {
        that.grid[y][x] = null;
        updateGraph(x, y);
    }

    function getElement(x, y) {
        return that.grid[y][x];
    }

    return {
        get grid() { return that.grid; },
        canPlace,
        addElement,
        getElement,
        removeElement,
        findPath
    }
}