import * as engine from "../engine/index.js";
window.onload = () => {
    new MyGame("GLCanvas");
};
class MyGame {
    constructor(htmlCanvasId) {
        engine.init(htmlCanvasId);
        const redSquare = new engine.Renderable();
        redSquare.setColor([1, 0, 0, 1]);
        const whiteSquare = new engine.Renderable();
        whiteSquare.setColor([1, 1, 1, 1]);
        engine.clearCanvas([0, 0.8, 0, 1]);
        whiteSquare.getTransform().setPosition(-0.25, 0.25);
        whiteSquare.getTransform().setRadRotation(0.2);
        whiteSquare.getTransform().setSize(1.2, 1.2);
        whiteSquare.draw();
        redSquare.getTransform().setPosX(0.25);
        redSquare.getTransform().setPosY(-0.25);
        redSquare.getTransform().setDegRotation(45);
        redSquare.getTransform().setWidth(0.4);
        redSquare.getTransform().setHeight(0.4);
        redSquare.draw();
    }
}
//# sourceMappingURL=my_game.js.map