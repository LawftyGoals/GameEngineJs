import * as engine from "../engine/index.js";

window.onload = () => {
  new MyGame("GLCanvas");
};

class MyGame {
  constructor(htmlCanvasId: string) {
    engine.init(htmlCanvasId);

    const redSquare = new engine.Renderable();
    redSquare.setColor([1, 0, 1, 1]);

    engine.clearCanvas([0, 0.8, 0, 1]);
    redSquare.draw();
  }
}
