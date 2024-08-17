import * as engine from "../engine/core.js";

class MyGame {
    constructor(htmlCanvasId: string) {
        engine.init(htmlCanvasId);
        engine.clearCanvas([0, 0.8, 0, 1]);
        engine.drawSquare();

    }
}

window.onload = () => {
    new MyGame("GLCanvas");
}