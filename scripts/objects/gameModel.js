MyGame.objects.gameModel = function(spec) {
    let time = 0;

    function update(elapsedTime) {
        time += elapsedTime;
    }

    // Got this from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return {
        update,
        get time() { return millisToMinutesAndSeconds(time); }
    }
}