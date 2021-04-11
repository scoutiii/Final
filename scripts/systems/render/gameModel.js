MyGame.systems.render.gameModel = (function(graphics, constants, renderer) {

    function render(spec) {
        // Draws star background
        graphics.drawTexture(
            MyGame.assets['bkgd-stars'], { x: constants.globalSize.width / 2, y: constants.globalSize.height / 2 },
            0, constants.globalSize
        );
        // Draws the border
        for (let i = 0; i < spec.border.length; i++) {
            renderer.border.render(spec.border[i]);
        }
        // Draws the creeps
        for (let i = 0; i < spec.creeps.length; i++) {
            renderer.creep.render(spec.creeps[i]);
        }
        // Draws the towers
        for (let i = 0; i < spec.towers.length; i++) {
            renderer.tower.render(spec.towers[i]);
        }
        // Draws the projectiles
        for (let i = 0; i < spec.projectiles.length; i++) {
            renderer.projectile.render(spec.projectiles[i]);
        }
        // Renders particles


        // Renders tower to place
        if (spec.towerToPlace != null) {
            renderer.tower.render(spec.towerToPlace);
        }

    }

    return {
        render
    }

}(MyGame.systems.graphics, MyGame.constants, MyGame.systems.render));