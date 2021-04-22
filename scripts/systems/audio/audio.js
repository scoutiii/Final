MyGame.systems.audioSystem = function() {
    let sounds = {};
    let mute = false;

    addSound(MyGame.assets["audioRocketLaunch"], "audioRocketLaunch");
    addSound(MyGame.assets["audioRocketExplosion"], "audioRocketExplosion");

    function addSound(sound, label, loop = false, volume = 1) {
        sounds[label] = sound;
        sounds[label].loop = loop;
    }

    function pauseSound(label) {
        sounds[label].pause();
    }

    function pauseAll() {
        for (label in sounds) {
            pauseSound(label);
        }
    }

    function rocketLaunch() {
        if (!mute) {
            sounds["audioRocketLaunch"].cloneNode(true).play();
        }
    }

    function rocketExplode() {
        if (!mute) {
            sounds["audioRocketExplosion"].cloneNode(true).play();
        }
    }

    return {
        pauseAll,
        rocketLaunch,
        rocketExplode,
        get mute() { return mute; },
        set mute(val) { mute = val; }
    }
}