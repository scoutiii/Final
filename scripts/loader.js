MyGame = {
    screens: {},
    objects: {},
    systems: {
        render: {},
        input: {},
        particles: {}
    },
    constants: {},
    misc: {
        newGame: true,
        controls: {
            upgrade: 'u',
            sell: 's',
            nextLevel: 'g'
        }
    },
    assets: {}
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [{
        scripts: ['systems/constants'], // Systems
        message: 'Constants loaded',
        onComplete: null
    }, {
        scripts: ['systems/random'],
        message: 'random loaded',
        onComplete: null
    }, {
        scripts: ['systems/audio/audio'],
        message: 'audio loaded',
        onComplete: null
    }, {
        scripts: ['systems/input/keyboardInput'],
        message: 'keyboard loaded',
        onComplete: null
    }, {
        scripts: ['systems/input/mouseInput'],
        message: 'mouse loaded',
        onComplete: null
    }, {
        scripts: ['systems/particle/particleSystem'],
        message: 'particle system loaded',
        onComplete: null
    }, {
        scripts: ['systems/particle/projectileSystem'],
        message: 'projectile system loaded',
        onComplete: null
    }, {
        scripts: ['objects/gameModel'], // Objects
        message: 'gameModel loaded',
        onComplete: null
    }, {
        scripts: ['objects/fps'],
        message: 'fps loaded',
        onComplete: null
    }, {
        scripts: ['objects/border'],
        message: 'border loaded',
        onComplete: null
    }, {
        scripts: ['objects/creep'],
        message: 'creep loaded',
        onComplete: null
    }, {
        scripts: ['objects/inGameMenu'],
        message: 'inGameMenu loaded',
        onComplete: null
    }, {
        scripts: ['objects/tower'],
        message: 'tower loaded',
        onComplete: null
    }, {
        scripts: ['objects/gameGrid'],
        message: 'gameGrid loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/core'], // Renderers
        message: 'core renderer loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/particleSystem'],
        message: 'particleSystem renderer loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/projectileSystem'],
        message: 'projectileSystem renderer loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/fps'],
        message: 'fps renderer loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/gameModel'],
        message: 'gameModel renderer loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/border'],
        message: 'border Loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/creep'],
        message: 'creep renderer loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/tower'],
        message: 'tower renderer loaded',
        onComplete: null
    }, {
        scripts: ['screens/screenManager'], // Screens
        message: 'screenManager loaded',
        onComplete: null
    }, {
        scripts: ['screens/mainMenu'],
        message: 'mainMenu loaded',
        onComplete: null
    }, {
        scripts: ['screens/controlMenu'],
        message: 'controlMenu loaded',
        onComplete: null
    }, {
        scripts: ['screens/credits'],
        message: 'credits loaded',
        onComplete: null
    }, {
        scripts: ['screens/gamePlay'],
        message: 'gamePlay loaded',
        onComplete: null
    }, {
        scripts: ['screens/highScores'],
        message: 'highScores loaded',
        onComplete: null
    }, {
        scripts: ['screens/pauseMenu'],
        message: 'pauseMenu loaded',
        onComplete: null
    }];

    let assetOrder = [{
        key: 'bkgd-horiz',
        source: '/assets/images/backgroundImages/horizontal.png'
    }, {
        key: 'bkgd-corner',
        source: '/assets/images/backgroundImages/left-bottom.png'
    }, {
        key: 'bkgd-stars',
        source: '/assets/images/backgroundImages/stars.png'
    }, {
        key: 'creep-blue-1',
        source: '/assets/images/animated/1blue.png'
    }, {
        key: 'creep-green-1',
        source: 'assets/images/animated/1green.png'
    }, {
        key: 'creep-red-1',
        source: 'assets/images/animated/1red.png'
    }, {
        key: 'creep-yellow-1',
        source: 'assets/images/animated/1yellow.png'
    }, {
        key: 'creep-blue-2',
        source: '/assets/images/animated/2blue.png'
    }, {
        key: 'creep-green-2',
        source: 'assets/images/animated/2green.png'
    }, {
        key: 'creep-red-2',
        source: 'assets/images/animated/2red.png'
    }, {
        key: 'creep-yellow-2',
        source: 'assets/images/animated/2yellow.png'
    }, {
        key: 'creep-blue-3',
        source: '/assets/images/animated/3blue.png'
    }, {
        key: 'creep-green-3',
        source: 'assets/images/animated/3green.png'
    }, {
        key: 'creep-red-3',
        source: 'assets/images/animated/3red.png'
    }, {
        key: 'creep-yellow-3',
        source: 'assets/images/animated/3yellow.png'
    }, {
        key: 'tower-ground-1',
        source: 'assets/images/towers/ground1.png'
    }, {
        key: 'tower-ground-2',
        source: 'assets/images/towers/ground2.png'
    }, {
        key: 'tower-ground-3',
        source: 'assets/images/towers/ground3.png'
    }, {
        key: 'tower-air-1',
        source: 'assets/images/towers/air1.png'
    }, {
        key: 'tower-air-2',
        source: 'assets/images/towers/air2.png'
    }, {
        key: 'tower-air-3',
        source: 'assets/images/towers/air3.png'
    }, {
        key: 'tower-bomb-1',
        source: 'assets/images/towers/bomb1.png'
    }, {
        key: 'tower-bomb-2',
        source: 'assets/images/towers/bomb2.png'
    }, {
        key: 'tower-bomb-3',
        source: 'assets/images/towers/bomb3.png'
    }, {
        key: 'tower-mixed-1',
        source: 'assets/images/towers/mixed1.png'
    }, {
        key: 'tower-mixed-2',
        source: 'assets/images/towers/mixed2.png'
    }, {
        key: 'tower-mixed-3',
        source: 'assets/images/towers/mixed3.png'
    }, {
        key: 'tower-base',
        source: 'assets/images/towers/base.png'
    }, {
        key: 'groundProj',
        source: 'assets/images/projectiles/groundLaser.png'
    }];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift(); // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift(); // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift(); // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1); // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function() {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);
                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('It is all loaded up');
        MyGame.screenManager.initialize(MyGame.constants.screens.mainMenu);
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) { // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());