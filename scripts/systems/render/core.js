MyGame.systems.graphics = (function(constants) {
    let canvas = document.getElementById("gamePlayCanvas");
    let context = canvas.getContext("2d");

    // conversion factor for degrees to radians
    let SFDegToRad = Math.PI / 180;

    // Resize the canvas first thing
    context.canvas.width = constants.canvasScaleFactor * window.innerHeight;
    context.canvas.height = constants.canvasScaleFactor * window.innerHeight;

    // scale factor from game coords to canvas coords
    let SF = canvas.height / constants.globalSize.height;

    // Update the canvas size automatically
    window.addEventListener(
        'resize',
        function() {
            context.canvas.width = constants.canvasScaleFactor * window.innerHeight;
            context.canvas.height = constants.canvasScaleFactor * window.innerHeight;
            SF = canvas.height / constants.globalSize.height;
        });


    // Clears the canvas
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Draws a picture
    function drawTexture(image, center, rotation, size) {
        context.save();

        // Sets the rotation
        context.translate(SF * center.x, SF * center.y);
        context.rotate(rotation * SFDegToRad);
        context.translate(-(SF * center.x), -(SF * center.y));

        // Draws the image
        context.drawImage(
            img = image,
            x = SF * (center.x - size.width / 2),
            y = SF * (center.y - size.height / 2),
            SF * size.width, SF * size.height
        );

        context.restore();
    }

    // Draws a subtexture for animations
    function drawSubTexture(image, index, subTextureWidth, center, rotation, size) {
        context.save();

        context.translate(SF * center.x, SF * center.y);
        context.rotate(rotation * SFDegToRad);
        context.translate(-(SF * center.x), -(SF * center.y));

        //
        // Pick the selected sprite from the sprite sheet to render
        context.drawImage(
            image,
            subTextureWidth * index, 0, // Which sub-texture to pick out
            subTextureWidth, image.height, // The size of the sub-texture
            SF * (center.x - size.width / 2), // Where to draw the sub-texture
            SF * (center.y - size.height / 2),
            SF * size.width, SF * size.height);

        context.restore();
    }

    // Draws a set of points (will close the path)
    function drawLines(points, fillStyle, strokeStyle, lineWidth, lineJoin) {
        context.save();

        // Moves to the first point
        context.beginPath();
        context.lineJoin = lineJoin;
        context.moveTo(SF * points[0].x, SF * points[0].y);

        // Lines to the remaining points
        for (let i = 1; i < points.length; i++) {
            context.lineTo(SF * points[i].x, SF * points[i].y);
        }
        context.closePath();

        // Sets options and draws
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.fillStyle = fillStyle;
        context.stroke();
        context.fill();

        context.restore();
    }

    // Draws some text
    function drawText(text, font, fillStyle, strokeStyle, position, rotation, baseline, align) {
        context.save();

        context.font = font;
        context.fillStyle = fillStyle;
        context.strokeStyle = strokeStyle;
        context.textBaseline = baseline;
        context.textAlign = align;

        context.translate(SF * position.x, SF * position.y);
        context.rotate(rotation);
        context.translate(-(SF * position.x), -(SF * position.y));

        context.fillText(text, SF * position.x, SF * position.y);
        context.strokeText(text, SF * position.x, SF * position.y);

        context.restore();
    }

    // Draws a circle
    function drawCircle(center, radius, fillStyle, strokeStyle) {
        context.save();

        context.beginPath();
        context.arc(SF * center.x,
            SF * center.y,
            SF * radius,
            0, 2 * Math.PI);
        context.fillStyle = fillStyle;
        context.strokeStyle = strokeStyle;
        context.stroke();
        context.fill();

        context.restore();
    }

    // Draws a rectangle
    function drawRectangle(corner, width, height, fill, stroke) {
        context.save();

        context.fillStyle = fill;
        context.fillRect(SF * corner.x,
            SF * corner.y,
            SF * width,
            SF * height);

        if (stroke) {
            context.strokeStyle = stroke;
            context.strokeRect(SF * corner.x,
                SF * corner.y,
                SF * width,
                SF * height);
        }

        context.restore();
    }

    return {
        get canvas() { return canvas; },
        get context() { return context; },
        clear,
        drawTexture,
        drawSubTexture,
        drawLines,
        drawText,
        drawCircle,
        drawRectangle
    }

}(MyGame.constants));