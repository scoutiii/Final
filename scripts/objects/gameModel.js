MyGame.objects.gameModel = function(spec) {


    //
    //
    //   Variables and such
    //
    //


    let objects = MyGame.objects;
    let constants = MyGame.constants;
    let towerVals = MyGame.constants.towers;
    let internalUpdate = null;


    // Sets up the border pieces
    let borders = [];
    for (let y = 0; y < constants.gridDim; y++) {
        for (let x = 0; x < constants.gridDim; x++) {
            let attempt = objects.border({ x: x, y: y });
            if (attempt.center != null) {
                borders.push(attempt);
            }
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
    let creeps = [];
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


    function onNextWave() {
        if (startNextWave) {
            creeps.push(objects.creep({
                type: constants.creeps.grunt.first,
                center: { x: 7, y: 7 },
                rotation: 0
            }));
            internalUpdate = waveStageUpdate;
            startNextWave = false;
            menu.setDialog("Incoming!!!");
        } else {
            menu.setDialog("We haven't finished this round yet!");
        }
    }

    // If player has enough gold, it sets the tower to place
    function onTowerSelect(type, cost, gold) {
        if (towerToPlace != null) {
            towerToPlace = null;
        } else {
            if (cost > gold) {
                menu.setDialog("You don't have enough gold!");
            } else {
                menu.setDialog("Place tower.");
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
        gold: 100,
        lives: 100,
        onNextWave: onNextWave,
        onTowerSelect: onTowerSelect,
        onGridClick: function() { showGrid = !showGrid;
                console.log("test"); } // toggles the grid lines

    });

    // Update function for the preparation stage
    function prepStageUpdate(elapsedTime) {

    }

    // Update functino for the wave stage
    function waveStageUpdate(elapsedTime) {
        menu.time = elapsedTime;
        menu.updateStatus();

        // Updates creeps
        for (let i = 0; i < creeps.length; i++) {
            creeps[i].update(elapsedTime);
        }

        // Updates towers
        for (tower in towers) {
            towers[tower].update(elapsedTime);
        }

        // Updates projectiles

        // Updates particles

        // Goes back to preparation stage
        if (creeps.length == 0) {
            creeps.length = 0;
            internalUpdate = prepStageUpdate;
            startNextWave = true;
            menu.setDialog("That was intense...");
        }
    }




    //
    //
    //   Tower placement/selection logic
    //
    //

    let mouseInput = spec.mouse;

    // Shows tower when the player has selected a tower to place
    mouseInput.registerCommand("mousemove",
        function(e, elapsedTime) {
            if (towerToPlace != null) {
                let rect = MyGame.systems.graphics.canvas.getBoundingClientRect();
                let canvasCoords = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
                // console.log(canvasCoords);
                towerToPlace.tower.center = {
                    x: canvasCoords.x / MyGame.systems.graphics.SF,
                    y: canvasCoords.y / MyGame.systems.graphics.SF
                };
                menu.setDialog("Place tower.");
            }
        });

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
                            id: towersNextName++
                        });
                        towers[tower.id] = tower;
                        // Adds the tower to the game grid
                        gameGrid.addElement(gridCoords.x, gridCoords.y, tower);
                        menu.gold = -towerToPlace.cost; // takes away the appropriate amount of gold
                        if (menu.gold < towerToPlace.cost) {
                            menu.setDialog("Not enought gold!");
                            towerToPlace = null;
                        }
                    } else {
                        menu.setDialog("Cannot place tower here!");
                    }
                }
            } else { // Trying to select a tower now
                menu.setDialog("test");
            }
        });










    //
    //
    //   Set up and return
    //
    //

    // Sets up the initial stage
    internalUpdate = prepStageUpdate;
    menu.setDialog("Preparation stage.");

    function update(elapsedTime) {
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