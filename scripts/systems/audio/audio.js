MyGame.systems.audioSystem = function() {
    let sounds = {};
    let mute = false;
    let playing = {};
    let nextName = 1;
    let toDelete = [];

    addSound(MyGame.assets["audioRocketLaunch"], "audioRocketLaunch", .3);
    addSound(MyGame.assets["audioRocketExplosion"], "audioRocketExplosion", .3);
    addSound(MyGame.assets["audioBombExplosion"], "audioBombExplosion", .3);
    addSound(MyGame.assets["audioCannonShot"], "audioCannonShot", .25);
    addSound(MyGame.assets["audioMixedShot"], "audioMixedShot", .2);

    // Adds a sound to the possible sounds
    function addSound(sound, label, volume = 1) {
        sounds[label] = {
            sound: sound,
            maxVolume: volume
        };
    }

    // update, remove sounds when done
    function update(elapsedTime) {
        toDelete = [];
        for (let id in playing) {
            if (playing[id].sound.ended) {
                toDelete.push(id);
            }
        }
        for (let i = 0; i < toDelete.length; i++) {
            delete playing[toDelete[i]];
        }
    }

    // mutes all sounds
    function muteAll() {
        for (let id in playing) {
            playing[id].sound.volume = 0;
        }
    }

    // unmutes all sounds
    function unmuteAll() {
        for (let id in playing) {
            playing[id].sound.volume = sounds[playing[id].type].maxVolume;
        }
    }

    // plays/adds a sound
    function playSound(name) {
        playing[nextName++] = {
            sound: sounds[name].sound.cloneNode(true),
            type: name
        };
        playing[nextName - 1].sound.volume = !mute * sounds[playing[nextName - 1].type].maxVolume;
        playing[nextName - 1].sound.play();
    }

    // sound for rocket launch
    function rocketLaunch() {
        playSound("audioRocketLaunch");
    }

    // sound for rocked explode
    function rocketExplode() {
        playSound("audioRocketExplosion");
    }

    // sounds for bomb explode
    function bombExplode() {
        playSound("audioBombExplosion");
    }

    // sound for cannon shot
    function groundShot() {
        playSound("audioCannonShot");
    }

    // sound for mixed gun shot
    function mixedShot() {
        playSound("audioMixedShot");
    }

    return {
        rocketLaunch,
        rocketExplode,
        bombExplode,
        groundShot,
        mixedShot,
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