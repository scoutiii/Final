MyGame.systems.audioSystem = function() {
    let sounds = {};
    let mute = false;

    addSound(MyGame.assets["audioRocketLaunch"], "audioRocketLaunch");

    function addSound(sound, label, loop = false) {
        sounds[label] = sound;
        sounds[label].loop = loop;
    }

    function playSound(label) {
        sounds[label].play();
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
        sounds["audioRocketLaunch"].cloneNode(true).play();
    }

    return {
        pauseAll,
        rocketLaunch,
        get mute() { return mute; },
        set mute(val) { mute = val; }
    }
}