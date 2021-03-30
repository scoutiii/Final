// Keyboard object which is adapted from the example code
MyGame.systems.input.keyboard = function() {
    // Holds all the keys, handlers, and appropriate functions
    let that = {
        keys: {},
        handlers: {},
        handlersDown: {},
        handlersUp: {}
    };

    // When a key is pressed, it adds it to the list to update it
    function keyPress(e) {
        if (that.handlersDown.hasOwnProperty(e.key)) {
            that.handlersDown[e.key]();
        }
        that.keys[e.key] = e.timeStamp;
    };

    // When the key is released it removes it from the list to call
    function keyRelease(e) {
        if (that.handlersUp.hasOwnProperty(e.key)) {
            that.handlersUp[e.key]();
        }
        delete that.keys[e.key];
    };

    // When update is called it calls the function with how much time has elapesd
    that.update = function(elapsedTime) {
        for (let key in that.keys) {
            if (that.keys.hasOwnProperty(key)) {
                if (that.handlers[key]) {
                    that.handlers[key](elapsedTime);
                }
            }
        }
    };

    // Registers a new key/command
    that.registerCommand = function(key, handler) {
        that.handlers[key] = handler;
    };

    // Removes a given key/command
    that.unregisterKey = function(key) {
        delete that.handlers[key];
    };

    // Registers a command for when a key is released
    that.registerCommandUp = function(key, handler) {
        that.handlersUp[key] = handler;
    };

    that.unregisterKeyUp = function(key) {
        delete that.handlersUp[key];
    }

    // Registers a command for when a key is first pressed
    that.registerCommandDown = function(key, handler) {
        that.handlersDown[key] = handler;
    };

    that.unregisterKeyDown = function(key) {
        delete that.handlersDown[key];
    }



    // hooks up the window listeners
    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    return that;
}