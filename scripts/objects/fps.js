MyGame.objects.fps = function() {
    let timeSinceLastUpdate = 0;
    let lastFPS = 0;
    let FPSCounter = 0;

    function update(elapsedTime) {
        // FPS stuff
        timeSinceLastUpdate += elapsedTime;
        FPSCounter += 1;
        if (timeSinceLastUpdate >= 100) {
            lastFPS = 10 * FPSCounter;
            timeSinceLastUpdate %= 100;
            FPSCounter = 0;
        }
    }

    return {
        update,
        get lastFPS() { return lastFPS; }
    }
}