// I got this straights from his example code

// ------------------------------------------------------------------
//
// This is a random number generation object.  It provides a handful
// of different ways to generate random numbers.  It is written as a
// Singleton so that there is only one of these throughout the program.
//
// ------------------------------------------------------------------
let Random = (function() {
    'use strict';

    function nextDouble() {
        return Math.random();
    }

    function nextRange(min, max) {
        let range = max - min;
        return Math.floor((Math.random() * range) + min);
    }

    function nextCircleVector(min = 0, max = 360) {
        // let angle = Math.random() * 2 * Math.PI;
        let angle = nextRange(min, max) * Math.PI / 180;
        return {
            x: Math.cos(angle),
            y: -Math.sin(angle)
        };
    }

    //
    // This is used to give a small performance optimization in generating gaussian random numbers.
    let usePrevious = false;
    let y2;

    //
    // Generate a normally distributed random number.
    //
    // NOTE: This code is adapted from a wiki reference I found a long time ago.  I originally
    // wrote the code in C# and am now converting it over to JavaScript.
    //
    function nextGaussian(mean, stdDev) {
        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let z = 0;

        if (usePrevious) {
            usePrevious = false;
            return mean + y2 * stdDev;
        }

        usePrevious = true;

        do {
            x1 = 2 * Math.random() - 1;
            x2 = 2 * Math.random() - 1;
            z = (x1 * x1) + (x2 * x2);
        } while (z >= 1);

        z = Math.sqrt((-2 * Math.log(z)) / z);
        y1 = x1 * z;
        y2 = x2 * z;

        return mean + y1 * stdDev;
    }

    // I got this from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    return {
        nextDouble: nextDouble,
        nextRange: nextRange,
        nextCircleVector: nextCircleVector,
        nextGaussian: nextGaussian,
        shuffleArray
    };

}());