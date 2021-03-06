MyGame.systems.audioSystem = function() {
    let sounds = {};
    let mute = false;
    let playing = {};
    let nextName = 1;
    let toDelete = [];

    addSound("audioRocketLaunch", .5);
    addSound("audioRocketExplosion", .3);
    addSound("audioBombExplosion", .3);
    addSound("audioCannonShot", .25);
    addSound("audioMixedShot", .2);
    addSound("audioBombShot", .5);
    addSound("audioCreepDeath", .2);
    addSound("audioSellTower", .7);
    addSound("audioTowerPlace", .4);
    addSound("audioTowerUpgrade", .5);

    // Adds a sound to the possible sounds
    function addSound(label, volume = 1) {
        sounds[label] = {
            sound: MyGame.assets[label],
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
        document.getElementById("backgroundMusic").volume = 0;
    }

    // unmutes all sounds
    function unmuteAll() {
        for (let id in playing) {
            playing[id].sound.volume = sounds[playing[id].type].maxVolume;
        }
        document.getElementById("backgroundMusic").volume = 1;

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

    // sound for bomb shot
    function bombShot() {
        playSound("audioBombShot");
    }

    // on creep death
    function creepDeath() {
        playSound("audioCreepDeath");
    }

    // on sell tower
    function sellTower() {
        playSound("audioSellTower");
    }

    // on tower place
    function placeTower() {
        playSound("audioTowerPlace");
    }

    // on upgrading tower
    function upgradeTower() {
        playSound("audioTowerUpgrade");
    }

    return {
        rocketLaunch,
        rocketExplode,
        bombExplode,
        groundShot,
        mixedShot,
        bombShot,
        creepDeath,
        sellTower,
        placeTower,
        upgradeTower,
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