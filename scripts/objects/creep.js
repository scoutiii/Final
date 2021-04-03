// Spec needs 
// 1. type: name of asset (1blue)
// 2. center: {x: , y: } game coords
// 3. rotation: degrees,
// 4. health: what ever
MyGame.objects.creep = function(spec) {
    // Defines stuff for animated sprite
    let image = MyGame.assets[spec.type];
    let subTextureWidth = 0;
    let spriteTime = [];
    let spriteCount = 0;
    let animationTime = 0;
    let subImageIndex = 0;
    if (spec.type[spec.type.length - 1] == "1") {
        spriteCount = 6;
        spriteTime = [1000, 200, 100, 1000, 100, 200];
    } else if (spec.type[spec.type.length - 1] == "2") {
        spriteCount = 4;
        spriteTime = [200, 1000, 200, 600];
    } else if (spec.type[spec.type.length - 1] == "3") {
        spriteCount = 4;
        spriteTime = [1000, 200, 200, 200];
    }
    subTextureWidth = image.width / spriteCount;

    // Defines other attributes
    let center = spec.center;
    let rotation = spec.rotation;
    let size = MyGame.constants.gridSize;
    let health = spec.health;

    // Updates the animation state
    function updateAnimation(elapsedTime) {
        animationTime += elapsedTime;
        if (animationTime >= spriteTime[subImageIndex]) {
            animationTime -= spriteTime[subImageIndex];
            subImageIndex = (subImageIndex + 1) % spriteCount;
        }
    }

    // Updates the state of the creep
    function update(elapsedTime) {
        updateAnimation(elapsedTime);
    }

    return {
        get animationInfo() {
            return {
                image,
                subImageIndex,
                subTextureWidth,
                center,
                rotation,
                size
            };
        },
        get health() { return health; },
        update
    }

}