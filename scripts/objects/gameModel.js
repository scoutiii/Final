MyGame.objects.gameModel = function(spec) {
    let time = 0;
    let border = {
        "1,1": { x: 1, y: 1, spec: { image: MyGame.assets['bkgd-corner'], rotation: 90 } }, // Points for top left
        "1,2": { x: 2, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,3": { x: 3, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,4": { x: 4, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,5": { x: 5, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,6": { x: 6, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "2,1": { x: 1, y: 2, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "3,1": { x: 1, y: 3, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "4,1": { x: 1, y: 4, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "5,1": { x: 1, y: 5, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "6,1": { x: 1, y: 6, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "1,12": { x: 12, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } }, // Points for top right
        "1,13": { x: 13, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,14": { x: 14, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,15": { x: 15, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,16": { x: 16, y: 1, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "1,17": { x: 17, y: 1, spec: { image: MyGame.assets['bkgd-corner'], rotation: 180 } },
        "2,17": { x: 17, y: 2, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "3,17": { x: 17, y: 3, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "4,17": { x: 17, y: 4, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "5,17": { x: 17, y: 5, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "6,17": { x: 17, y: 6, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "17,1": { x: 1, y: 17, spec: { image: MyGame.assets['bkgd-corner'], rotation: 0 } }, // Points for bottom left
        "17,2": { x: 2, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,3": { x: 3, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,4": { x: 4, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,5": { x: 5, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,6": { x: 6, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "16,1": { x: 1, y: 16, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "15,1": { x: 1, y: 15, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "14,1": { x: 1, y: 14, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "13,1": { x: 1, y: 13, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "12,1": { x: 1, y: 12, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "17,12": { x: 12, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } }, // Points for bottom right
        "17,13": { x: 13, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,14": { x: 14, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,15": { x: 15, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,16": { x: 16, y: 17, spec: { image: MyGame.assets['bkgd-horiz'] } },
        "17,17": { x: 17, y: 17, spec: { image: MyGame.assets['bkgd-corner'], rotation: -90 } },
        "16,17": { x: 17, y: 16, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "15,17": { x: 17, y: 15, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "14,17": { x: 17, y: 14, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "13,17": { x: 17, y: 13, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } },
        "12,17": { x: 17, y: 12, spec: { image: MyGame.assets['bkgd-horiz'], rotation: 90 } }
    }

    let gameGrid = MyGame.objects.gameGrid({
        height: 19,
        width: 19,
        gridSize: MyGame.constants.globalSize / 19,
        border: border,
        background: MyGame.assets['bkgd-stars']
    });

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
        get time() { return millisToMinutesAndSeconds(time); },
        get gameGrid() { return gameGrid; }
    }
}