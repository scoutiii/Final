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

    // Track enemies, towers, and projectiles
    let creeps = [];
    let towers = [];
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
            // creeps.push(objects.creep({
            //     type: constants.creeps.grunt.first,
            //     center: { x: 7, y: 7 },
            //     rotation: 0
            // }));
            // towers.push(objects.tower({
            //     level: 0,
            //     type: towerVals.ground.type,
            //     center: { x: 5, y: 5 },
            //     creeps: creeps
            // }));
            internalUpdate = waveStageUpdate;
            startNextWave = false;
            menu.setDialog("Incoming!!!");
        } else {
            menu.setDialog("We haven't finished this round yet!");
        }
    }

    // If player has enough gold, it sets the tower to place
    function onTowerSelect(type, cost, gold) {
        if (cost > gold) {
            menu.setDialog("You don't have enough gold!");
        } else {
            menu.setDialog("Place tower.");
            towerToPlace = objects.tower({
                level: 0,
                type: towerVals[type].type,
                center: { x: null, y: null },
                creeps: creeps,
                showRadius: true
            });
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
        onTowerSelect: onTowerSelect
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
        for (let i = 0; i < towers.length; i++) {
            towers[i].update(elapsedTime, creeps);
        }

        // Updates projectiles

        // Updates particles

        // Goes back to preparation stage
        if (creeps.length == 0) {
            creeps.length = 0;
            towers.length = 0;
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

    mouseInput.registerCommand("mousemove",
        function(e, elapsedTime) {
            if (towerToPlace != null) {
                console.log(e.clientX + " , " + e.clientY);
                let canvas = MyGame.systems.graphics.canvas;
                let SF = {
                    x: canvas.width / canvas.offsetWidth,
                    y: canvas.height / canvas.offsetHeight
                };
                towerToPlace.center = {
                    x: (e.clientX - canvas.offsetLeft) * SF.x,
                    y: (e.clientY - canvas.offsetTop) * SF.y
                };
                // towerToPlace.center = {
                //     x: e.screenX,
                //     y: e.screenY
                // }
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
        processInput
    }
}