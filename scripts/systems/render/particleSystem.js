MyGame.systems.render.particleSystem = (function(graphics, constants) {
    // // Sets up the thrust particle image
    // let imageThrust = new Image();
    // let isReadyThrust = false;
    // imageThrust.onload = function() {
    //     isReadyThrust = true;
    // }
    // imageThrust.src = images.thrust;

    // // Sets up the crash particle image
    // let imageCrash = new Image();
    // let isReadyCrash = false;
    // imageCrash.onload = function() {
    //     isReadyCrash = true;
    // }
    // imageCrash.src = images.crash;

    function render(spec) {
        // if (isReadyCrash && isReadyThrust) {
        //     let obj = Object.getOwnPropertyNames(spec.system.particles);
        //     if (obj.length > 0) {
        //         obj.forEach(function(value) {
        //             let particle = system.particles[value];
        //             let image = null;
        //             // Check for particle type
        //             // if (particle.type == "thrust") {
        //             //     image = imageThrust;
        //             // } else if (particle.type == "crash") {
        //             //     image = imageCrash;
        //             // }
        //             graphics.drawTexture(image, particle.center, particle.rotation, particle.size);
        //         });
        //     }

        // }
    }

    return {
        render
    };
}(MyGame.graphics, MyGame.constants));