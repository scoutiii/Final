MyGame.objects.gameModel = function(spec) {


    //
    //
    //   Variables and such
    //
    //


    let objects = MyGame.objects;
    let constants = MyGame.constants;
    let towerVals = MyGame.constants.towers;

    // Sets up the creeps path update behavior
    let internalUpdate = null;
    let updatePaths = {
        func: null,
        todo: {},
        timeInterval: 6,
        elapsedTime: 0,
        remove: function(id) {
            delete updatePaths.todo[id];
        },
        populate: function(ids) {
            for (let i = 0; i < ids.length; i++) {
                updatePaths.todo[ids[i]] = ids[i];
            }
            updatePaths.elapsedTime = 0;
            updatePaths.timeInterval = 300 / ids.length;
            updatePaths.func = updateCreepPaths;
        }
    };

    // Facilitates updating the creeps paths 1 per frame
    function updateCreepPaths(elapsedTime) {
        updatePaths.elapsedTime += elapsedTime;
        if (updatePaths.elapsedTime >= updatePaths.timeInterval) {
            updatePaths.elapsedTime %= updatePaths.timeInterval;
            let todo = Object.keys(updatePaths.todo);
            if (todo.length > 0) {
                creeps[todo[0]].updatePath();
                delete updatePaths.todo[todo[0]];
            } else {
                updatePaths.todo = {};
                updatePaths.func = null;
            }
        }
    }

    let mouseInput = spec.mouse;
    let keyboard = spec.keyboard;


    // Sets up the border pieces
    let borders = [];
    let attempt = null;
    // Sets up the target matrix
    let targetMatrix = [];
    for (let y = 0; y < constants.gridDim; y++) {
        targetMatrix[y] = [];
        for (let x = 0; x < constants.gridDim; x++) {
            attempt = objects.border({ x: x, y: y });
            if (attempt.center != null) {
                borders.push(attempt);
            }
            targetMatrix[y][x] = {};
        }
    }

    // Keeps track of the internal grid for path finding and such
    let gameGrid = objects.gameGrid({
        width: constants.gridDim,
        height: constants.gridDim,
        borders: borders
    });
    let showGrid = false;

    // Track enemies, towers, and projectiles
    let creeps = {};
    let creepsNextName = 1;
    let creepStatus = constants.creeps.status.normal;
    let creepTypes = ["grunt", "hunter", "bugger"];
    let creepLevels = ["first", "second", "third", "fourth"];

    let towers = {};
    let towersNextName = 1;
    let projectiles = [];



    // Tracks selected towers/ towers to place
    let towerToPlace = null;
    let towerSelected = null;



    //
    //
    //   Update codes
    //
    //

    // Is called when the next wave is supposed to start
    function onNextWave() {
        if (startNextWave) {
            for (let n = 0; n < 10; n++) {
                for (let i = 0; i < creepTypes.length; i++) {
                    for (let j = 0; j < creepLevels.length; j++) {
                        creeps[creepsNextName] = (objects.creep({
                            name: creepTypes[i],
                            level: creepLevels[j],
                            spawn: 0,
                            rotation: 0,
                            grid: gameGrid,
                            id: creepsNextName++,
                            targetMatrix: targetMatrix,
                            updateTargetMatrix
                        }));
                    }
                }
            }
            console.log(Object.keys(creeps).length);
            internalUpdate = waveStageUpdate;
            startNextWave = false;
            menu.setDialog("Incoming!!!");
        } else {
            menu.setDialog("We haven't finished this round yet!");
        }
    }

    // If player has enough gold, it sets the tower to place
    function onTowerSelect(type, cost, gold) {
        // Deselects tower if there is one
        deselectTower();

        if (towerToPlace != null && towerToPlace.type == type) {
            towerToPlace = null;
        } else {
            if (cost > gold) {
                menu.setDialog("You don't have enough gold!");
            } else {
                menu.setDialog("Place tower. Click the type of tower again to deselect it.");
                towerToPlace = {
                    cost: cost,
                    type: type
                };
                towerToPlace.tower = objects.tower({
                    level: 0,
                    type: towerVals[type].type,
                    center: { x: NaN, y: NaN },
                    creeps: creeps,
                    showRadius: true
                });
            }
        }
    }


    // Manages the in game menu
    let startNextWave = true;
    let menu = objects.inGameMenu({
        level: 1,
        wave: 0,
        time: 0,
        gold: 10000,
        lives: 100,
        onNextWave: onNextWave,
        onTowerSelect: onTowerSelect,
        onGridClick: function() { showGrid = !showGrid; } // toggles the grid lines

    });

    // Update function for the preparation stage
    function prepStageUpdate(elapsedTime) {

    }

    // Update function for the wave stage
    function waveStageUpdate(elapsedTime) {
        menu.time = elapsedTime;

        if (updatePaths.func) {
            updatePaths.func(elapsedTime);
        }

        // Updates creeps
        let creepsToDelete = [];
        for (creep in creeps) {
            creepStatus = creeps[creep].update(elapsedTime);
            if (creepStatus == constants.creeps.status.success) {
                menu.lives = -1;
                creepsToDelete.push(creeps[creep]);
                updatePaths.remove(creeps[creep].id);
            } else if (creepStatus == constants.creeps.status.death) {
                menu.gold = creeps[i].value;
                creepsToDelete.push(creeps[creep]);
                updatePaths.remove(creeps[creep].id);
            } else if (creepStatus == constants.creeps.status.outOfBounds) {
                creepsToDelete.push(creeps[creep]);
                updatePaths.remove(creeps[creep].id);
            }
        }
        // Deletes the creeps
        for (let i = 0; i < creepsToDelete.length; i++) {
            delete creeps[creepsToDelete[i].id];
        }

        // Updates towers
        for (tower in towers) {
            towers[tower].update(elapsedTime);
        }

        // Updates projectiles

        // Updates particles

        // Goes back to preparation stage
        if (Object.keys(creeps).length == 0) {
            internalUpdate = prepStageUpdate;
            startNextWave = true;
            menu.setDialog("That was intense...");
        }
    }



    // Updates the target matrix when a creep moves
    function updateTargetMatrix(prev, curr, name) {
        if (prev != null) {
            delete targetMatrix[prev.y][prev.x][name];
        }
        if (curr != null) {
            targetMatrix[curr.y][curr.x][name] = creeps[name];
        }
    }


    //
    //
    //   Tower placement/selection logic
    //
    //


    // Shows tower when the player has selected a tower to place
    mouseInput.registerCommand("mousemove",
        function(e, elapsedTime) {
            if (towerToPlace != null) {
                let rect = MyGame.systems.graphics.canvas.getBoundingClientRect();
                let canvasCoords = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
                towerToPlace.tower.center = {
                    x: canvasCoords.x / MyGame.systems.graphics.SF,
                    y: canvasCoords.y / MyGame.systems.graphics.SF
                };
            }
        }
    );

    // Handles when the player clicks to place
    mouseInput.registerCommand("mousedown",
        function(e, elapsedTime) {
            let rect = MyGame.systems.graphics.canvas.getBoundingClientRect();
            let canvasCoords = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            let gameCoords = {
                x: canvasCoords.x / MyGame.systems.graphics.SF,
                y: canvasCoords.y / MyGame.systems.graphics.SF
            };
            let gridCoords = {
                x: Math.floor(gameCoords.x / constants.gridSize.width),
                y: Math.floor(gameCoords.y / constants.gridSize.height)
            };

            deselectTower();
            // trying to place a tower
            if (towerToPlace != null) {
                // Not enough gold
                if (towerToPlace.cost > menu.gold) {
                    menu.setDialog("Not enough gold!");
                    towerToPlace = null;
                } else {
                    // Able to place the tower
                    if (gameGrid.canPlace(gridCoords.x, gridCoords.y, true)) {
                        // Adds a new tower to the towers list
                        let tower = objects.tower({
                            level: 0,
                            type: towerVals[towerToPlace.type].type,
                            center: gridCoords,
                            creeps: creeps,
                            showRadius: false,
                            id: towersNextName++,
                            value: towerToPlace.cost,
                            targetMatrix: targetMatrix
                        });
                        towers[tower.id] = tower;
                        // Adds the tower to the game grid
                        gameGrid.addElement(gridCoords.x, gridCoords.y, tower);
                        menu.gold = -towerToPlace.cost; // takes away the appropriate amount of gold
                        if (menu.gold < towerToPlace.cost) {
                            menu.setDialog("Not enought gold!");
                            towerToPlace = null;
                        }
                        // Sets up the updates for creep paths
                        updatePaths.populate(Object.keys(creeps));
                    } else {
                        menu.setDialog("Cannot place tower here!");
                    }
                }
            } else { // Trying to select a tower now
                let selected = gameGrid.getElement(gridCoords.x, gridCoords.y);
                if (selected != null && selected.name == "tower") {
                    towerSelected = towers[selected.id];
                    displayTowerInfo(towerSelected);
                } else {
                    deselectTower();
                    menu.setDialog("");
                }
            }
        }
    );


    function displayTowerInfo(tower) {
        let message = "";
        tower.showRadius = true;
        message += "ID: " + tower.id;
        message += "<br>TYPE: " + tower.type;
        message += "<br>LEVEL: " + (tower.level + 1);
        message += "<br>SELL VALUE: " + tower.value;
        message += "<br>RANGE: " + tower.range;
        message += "<br>DAMAGE: " + tower.damage;
        if (tower.level < 2) {
            message += "<br>UPGRADE COST: " + towerVals.stats[tower.type][tower.level + 1].cost;
        }
        message += "<br>Click " + MyGame.misc.controls.sell + " to sell, " +
            "Click " + MyGame.misc.controls.upgrade + " to upgrade.";
        menu.setDialog(message);
    }

    // Deselects tower if there is one
    function deselectTower() {
        if (towerSelected != null) {
            towerSelected.showRadius = false;
        }
        towerSelected = null;
    }

    //
    // Sets up keyboard commands
    //

    // On upgrade
    keyboard.registerCommandDown(
        MyGame.misc.controls.upgrade,
        function(elapsedTime) {
            if (towerSelected != null) {
                // Sees if we are already at max level
                if (towerSelected.level >= 2) {
                    deselectTower();
                    menu.setDialog("Tower already max level.");
                }
                // Sees if we have enough money
                else if (towerVals.stats[towerSelected.type][towerSelected.level + 1].cost > menu.gold) {
                    deselectTower();
                    menu.setDialog("Not enough money to upgrade.");
                } else {
                    towerSelected.upgrade();
                    menu.gold = -towerVals.stats[towerSelected.type][towerSelected.level].cost;
                    displayTowerInfo(towerSelected);
                }
            }
        }
    );

    // On sell 
    keyboard.registerCommandDown(
        MyGame.misc.controls.sell,
        function(elapsedTime) {
            if (towerSelected != null) {
                menu.gold = towerSelected.value;
                gameGrid.removeElement(towerSelected.gridPosition.x, towerSelected.gridPosition.y);
                delete towers[towerSelected.id];
                deselectTower();
                menu.setDialog("Tower sold.");
            }
        }
    );

    // On next wave
    keyboard.registerCommandDown(
        MyGame.misc.controls.nextLevel,
        function(elapsedTime) {
            onNextWave();
        }
    )



    //
    //
    //   Set up and return
    //
    //

    // Sets up the initial stage
    internalUpdate = prepStageUpdate;
    menu.setDialog("Preparation stage.");

    function update(elapsedTime) {
        // If frames ever drop below 60 fps, the simulation slows down (to about 60 fps)
        elapsedTime = ((elapsedTime <= 17) * elapsedTime) + ((elapsedTime > 17) * 17);
        internalUpdate(elapsedTime);
    }

    function processInput(elapsedTime) {
        mouseInput.update(elapsedTime);
    }

    return {
        update,
        get creeps() { return creeps; },
        get towers() { return towers; },
        get border() { return borders; },
        get projectiles() { return projectiles; },
        get towerToPlace() { return towerToPlace; },
        processInput,
        get showGrid() { return showGrid; }
    }
}