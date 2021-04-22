MyGame.screens[MyGame.constants.screens.gamePlay] = (function(screenManager, objects, renderer, graphics, input, systems, constants) {
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let gameModel = null;
    let keyboard = input.keyboard();
    let mouse = input.mouse();
    let FPS = objects.fps();

    // Processes all the inputs
    function processInput(elapsedTime) {
        keyboard.update(elapsedTime);
        mouse.update(elapsedTime);
    }

    // Updates all the objects
    function update(elapsedTime) {
        FPS.update(elapsedTime);
        gameModel.update(elapsedTime);
    }

    // Renders all the objects
    function render(elapsedTime) {
        graphics.clear();
        renderer.gameModel.render(gameModel);
        renderer.fps.render(FPS);
    }

    // Main game loop
    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render(elapsedTime);

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    // Sets everything up when starting/resuming a game
    function run() {
        console.log("run: gamePlay");

        lastTimeStamp = performance.now();
        cancelNextRequest = false;

        if (MyGame.misc.newGame) {
            gameModel = objects.gameModel({
                keyboard,
                mouse,
                scoreID: MyGame.misc.getSessionID()
            });
        }

        // Register keyboard stuff
        keyboard.registerCommand("Escape", function() {
            // addScores(gameModel)
            cancelNextRequest = true;
            screenManager.showScreen(constants.screens.pauseMenu);
        })

        requestAnimationFrame(gameLoop);
    }

    // Initialize the window, doesn't really do anything
    function initialize() {
        console.log("initialize: gamePlay");
    }

    return {
        initialize,
        run
    }
}(MyGame.screenManager,
    MyGame.objects,
    MyGame.systems.render,
    MyGame.systems.graphics,
    MyGame.systems.input,
    MyGame.systems,
    MyGame.constants));