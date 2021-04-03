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
        scripts: ['systems/constants'],
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
        scripts: ['objects/gameModel'],
        message: 'gameModel loaded',
        onComplete: null
    }, {
        scripts: ['objects/fps'],
        message: 'fps loaded',
        onComplete: null
    }, {
        scripts: ['objects/gameGrid'],
        message: 'gameGrid loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/core'],
        message: 'core renderer loaded',
        onComplete: null
    }, {
        scripts: ['systems/render/particleSystem'],
        message: 'particleSystem renderer loaded',
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
        scripts: ['systems/render/gameGrid'],
        message: 'gameGrid renderer loaded',
        onComplete: null
    }, {
        scripts: ['screens/screenManager'],
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
        },
        //  {
        //     key: 'bkgd-left-top',
        //     source: '/assets/images/backgroundImages/left-top.png'
        // }, {
        //     key: 'bkgd-right-bottom',
        //     source: '/assets/images/backgroundImages/right-bottom.png'
        // }, {
        //     key: 'bkgd-right-top',
        //     source: '/assets/images/backgroundImages/right-top.png'
        // }, {
        //     key: 'bkgd-vertical',
        //     source: '/assets/images/backgroundImages/vertical.png'
        // },
        {
            key: 'bkgd-stars',
            source: '/assets/images/backgroundImages/stars.png'
        }
    ];

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