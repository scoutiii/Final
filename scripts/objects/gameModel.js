MyGame.objects.gameModel = function(spec) {
    // Sets up the grid
    let objects = MyGame.objects;
    let time = 0;
    let border = {
        "1,1": { x: 1, y: 1, object: objects.border({ image: MyGame.assets['bkgd-corner'], rotation: 90 }) }, // Points for top left
        "1,2": { x: 2, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,3": { x: 3, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,4": { x: 4, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,5": { x: 5, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,6": { x: 6, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "2,1": { x: 1, y: 2, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "3,1": { x: 1, y: 3, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "4,1": { x: 1, y: 4, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "5,1": { x: 1, y: 5, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "6,1": { x: 1, y: 6, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "1,12": { x: 12, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) }, // Points for top right
        "1,13": { x: 13, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,14": { x: 14, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,15": { x: 15, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,16": { x: 16, y: 1, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "1,17": { x: 17, y: 1, object: objects.border({ image: MyGame.assets['bkgd-corner'], rotation: 180 }) },
        "2,17": { x: 17, y: 2, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "3,17": { x: 17, y: 3, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "4,17": { x: 17, y: 4, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "5,17": { x: 17, y: 5, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "6,17": { x: 17, y: 6, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "17,1": { x: 1, y: 17, object: objects.border({ image: MyGame.assets['bkgd-corner'], rotation: 0 }) }, // Points for bottom left
        "17,2": { x: 2, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,3": { x: 3, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,4": { x: 4, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,5": { x: 5, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,6": { x: 6, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "16,1": { x: 1, y: 16, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "15,1": { x: 1, y: 15, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "14,1": { x: 1, y: 14, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "13,1": { x: 1, y: 13, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "12,1": { x: 1, y: 12, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "17,12": { x: 12, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) }, // Points for bottom right
        "17,13": { x: 13, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,14": { x: 14, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,15": { x: 15, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,16": { x: 16, y: 17, object: objects.border({ image: MyGame.assets['bkgd-horiz'] }) },
        "17,17": { x: 17, y: 17, object: objects.border({ image: MyGame.assets['bkgd-corner'], rotation: -90 }) },
        "16,17": { x: 17, y: 16, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "15,17": { x: 17, y: 15, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "14,17": { x: 17, y: 14, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "13,17": { x: 17, y: 13, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) },
        "12,17": { x: 17, y: 12, object: objects.border({ image: MyGame.assets['bkgd-horiz'], rotation: 90 }) }
    }

    let gameGrid = MyGame.objects.gameGrid({
        dimension: MyGame.constants.gridDim,
        gridSize: MyGame.constants.gridSize,
        border: border,
        background: MyGame.assets['bkgd-stars']
    });

    // Track enemies
    let creeps = [];
    let towers = [];

    creeps.push(objects.creep({
            type: 'creep-blue-1',
            center: { x: 500, y: 500 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-green-1',
            center: { x: 400, y: 500 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-red-1',
            center: { x: 300, y: 500 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-yellow-1',
            center: { x: 200, y: 500 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-blue-2',
            center: { x: 500, y: 400 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-green-2',
            center: { x: 400, y: 400 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-red-2',
            center: { x: 300, y: 400 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-yellow-2',
            center: { x: 200, y: 400 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-blue-3',
            center: { x: 500, y: 300 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-green-3',
            center: { x: 400, y: 300 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-red-3',
            center: { x: 300, y: 300 },
            rotation: 0,
            health: 100
        }),
        objects.creep({
            type: 'creep-yellow-3',
            center: { x: 200, y: 300 },
            rotation: 0,
            health: 100
        }));

    function update(elapsedTime) {
        time += elapsedTime;

        for (let i = 0; i < creeps.length; i++) {
            creeps[i].update(elapsedTime);
        }
    }

    // Got this from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return {
        update,
        get time() { return millisToMinutesAndSeconds(time); },
        get gameGrid() { return gameGrid; },
        get creeps() { return creeps; }
    }
}