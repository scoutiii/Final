MyGame.objects.fps = function() {
    let lastFPS = 0;
    let time = 0;
    let timeLimit = 100;
    let average = 0;
    let count = 0;

    function update(elapsedTime) {
        time += elapsedTime;
        average = ((count * average) + elapsedTime) / ++count;
        if (time > timeLimit) {
            time %= timeLimit;
            lastFPS = Math.round(1000 / average);
            average = 0;
            count = 0;
        }
    }

    return {
        update,
        get lastFPS() { return lastFPS; }
    }
}