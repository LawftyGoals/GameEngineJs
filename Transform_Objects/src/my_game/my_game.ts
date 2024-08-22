import * as engine from "../engine/index.js";
import * as mat4 from "../lib/matrixManpulation/mat4.js";
import * as vec3 from "../lib/matrixManpulation/vec3.js";

window.onload = () => {
  new MyGame("GLCanvas");
};

class MyGame {
  constructor(htmlCanvasId: string) {
    engine.init(htmlCanvasId);

    const redSquare = new engine.Renderable();
    redSquare.setColor([1, 0, 0, 1]);
    const whiteSquare = new engine.Renderable();
    whiteSquare.setColor([1, 1, 1, 1]);

    engine.clearCanvas([0, 0.8, 0, 1]);

    let trsMatrix = mat4.create();

    mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25, 0.0));
    mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
    mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));

    whiteSquare.draw(trsMatrix);

    mat4.identity(trsMatrix);
    mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0.0));
    mat4.rotateZ(trsMatrix, trsMatrix, -0.785);
    mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));

    redSquare.draw(trsMatrix);
  }
}
