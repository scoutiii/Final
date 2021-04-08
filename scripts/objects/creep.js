// Spec needs 
// 1. type: name of asset (creep-blue-1)
// 2. center: {x: , y: } game coords
// 3. rotation: degrees,
// 4. health: what ever
MyGame.objects.creep = function(spec) {
    // Defines stuff for animated sprite
    let that = {};
    that.type = spec.type;
    that.image = MyGame.assets[that.type];
    that.subTextureWidth = 0;
    that.spriteTime = [];
    that.spriteCount = 0;
    that.animationTime = 0;
    that.subImageIndex = 0;
    that.spriteCount = MyGame.constants.creeps.animation[spec.type].spriteCount;
    that.spriteTime = MyGame.constants.creeps.animation[spec.type].spriteTime;
    that.subTextureWidth = that.image.width / that.spriteCount;

    // Defines other attributes
    that.center = {
        x: MyGame.constants.gridSize.width * (spec.center.x + 0.5),
        y: MyGame.constants.gridSize.height * (spec.center.y + 0.5)
    };
    that.rotation = spec.rotation - 90;
    that.size = MyGame.constants.gridSize;
    that.stats = MyGame.constants.creeps.stats[that.type];

    // Updates the animation state
    function updateAnimation(elapsedTime) {
        that.animationTime += elapsedTime;
        if (that.animationTime >= that.spriteTime[that.subImageIndex]) {
            that.animationTime -= that.spriteTime[that.subImageIndex];
            that.subImageIndex = (that.subImageIndex + 1) % that.spriteCount;
        }
    }

    // Updates the state of the creep
    function update(elapsedTime) {
        updateAnimation(elapsedTime);
    }

    return {
        get animationInfo() {
            return {
                image: that.image,
                subImageIndex: that.subImageIndex,
                subTextureWidth: that.subTextureWidth,
                center: that.center,
                rotation: that.rotation,
                size: that.size
            };
        },
        get health() { return that.stats.health; },
        update
    }

}