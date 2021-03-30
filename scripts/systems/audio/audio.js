MyGame.systems.audioSystem = function() {
    let sounds = {}

    function loadSound(source, label, loop, volume) {
        let sound = new Audio();
        sound.src = source;
        sound.loop = loop;
        sound.volume = volume;
        sounds[label] = sound;
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

    return {
        loadSound,
        playSound,
        pauseSound,
        pauseAll
    }
}