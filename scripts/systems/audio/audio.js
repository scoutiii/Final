MyGame.systems.audioSystem = function() {
    let sounds = {};
    let mute = false;
    let playing = {};
    let nextName = 1;
    let toDelete = [];

    addSound(MyGame.assets["audioRocketLaunch"], "audioRocketLaunch");
    addSound(MyGame.assets["audioRocketExplosion"], "audioRocketExplosion");
    addSound(MyGame.assets["audioBombExplosion"], "audioBombExplosion");

    // Adds a sound to the possible sounds
    function addSound(sound, label, loop = false, volume = 1) {
        sounds[label] = sound;
        sounds[label].loop = loop;
    }

    // update, remove sounds when done
    function update(elapsedTime) {
        toDelete = [];
        for (let id in playing) {
            if (playing[id].ended) {
                toDelete.push(id);
            }
        }
        for (let i = 0; i < toDelete.length; i++) {
            delete playing[toDelete[i]];
        }
    }

    function muteAll() {
        for (let id in playing) {
            playing[id].volume = 0;
        }
    }

    function unmuteAll() {
        for (let id in playing) {
            playing[id].volume = 1;
        }
    }

    function rocketLaunch() {
        playing[nextName++] = sounds["audioRocketLaunch"].cloneNode(true);
        playing[nextName - 1].volume = 1 * !mute;
        playing[nextName - 1].play();
    }

    function rocketExplode() {
        playing[nextName++] = sounds["audioRocketExplosion"].cloneNode(true);
        playing[nextName - 1].volume = 1 * !mute;
        playing[nextName - 1].play();
    }

    function bombExplode() {
        playing[nextName++] = sounds["audioBombExplosion"].cloneNode(true);
        playing[nextName - 1].volume = 1 * !mute;
        playing[nextName - 1].play();
    }

    return {
        rocketLaunch,
        rocketExplode,
        bombExplode,
        update,
        get mute() { return mute; },
        set mute(val) {
            if (!mute && val == true) {
                muteAll();
            } else if (mute && val == false) {
                unmuteAll();
            }
            mute = val;
        }
    }
}