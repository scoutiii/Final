MyGame.objects.gameModel = function(spec) {
    let objects = MyGame.objects;
    let constants = MyGame.constants;
    let towerVals = MyGame.constants.towers;
    let internalUpdate = null;
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
        background: MyGame.assets['bkgd-stars'],
        internalSpec: {
            start: { x: 2, y: 2 },
            dimension: 15
        }
    });

    // Track enemies and towers
    let creeps = [];
    let towers = [];
    towers.push(objects.tower({
        level: 0,
        type: towerVals.ground.type,
        position: gameGrid.XYAtGrid({ col: 5, row: 5 }),

    }));
    gameGrid.updateGridCell(5, 5, { object: towers[0] });

    let startNextWave = true;
    // Manages the in game menu
    let menu = objects.inGameMenu({
        level: 1,
        wave: 0,
        time: 0,
        gold: 100,
        lives: 100,
        onNextWave: function() {
            if (startNextWave) {
                internalUpdate = waveStageUpdate;
                startNextWave = false;
                menu.setDialog("Incoming!!!");
            } else {
                menu.setDialog("We haven't finished this round yet!");
            }
        }
    });


    function prepStageUpdate(elapsedTime) {

    }

    function waveStageUpdate(elapsedTime) {
        menu.time = elapsedTime;
        menu.updateStatus();

        for (let i = 0; i < creeps.length; i++) {
            creeps[i].update(elapsedTime);
        }
        creeps.length = 1;

        // Goes back to preparation stage
        if (creeps.length == 0) {
            internalUpdate = prepStageUpdate;
            startNextWave = true;
            menu.setDialog("That was intense...");
        }
        creeps.length = 0;
    }


    // Sets up the initial stage
    internalUpdate = prepStageUpdate;
    menu.setDialog("Preparation stage.");

    function update(elapsedTime) {
        internalUpdate(elapsedTime);
    }

    return {
        update,
        get gameGrid() { return gameGrid; },
        get creeps() { return creeps; }
    }
}