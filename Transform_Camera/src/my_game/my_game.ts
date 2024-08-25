import * as engine from "../engine/index.js";
import * as glSys from "../engine/core/glSys.js";
import * as vec2 from "../matrixManpulation/vec2.js";
import * as vec3 from "../matrixManpulation/vec3.js";
import * as mat4 from "../matrixManpulation/mat4.js";


window.onload = () => {
    new MyGame("GLCanvas");
};

class MyGame {

    constructor(htmlCanvasId: string) {
        engine.init(htmlCanvasId);
        const blueSquare = new engine.Renderable();
        blueSquare.setColor([0.25, 0.25, 0.95, 1]);
        const redSquare = new engine.Renderable();
        redSquare.setColor([1, 0.25, 0.25, 1]);
        const TLSq = new engine.Renderable();
        TLSq.setColor([0.9, 0.1, 0.1, 1]);
        const trsq = new engine.Renderable();
        trsq.setColor([0.1, 0.9, 0.1, 1]);
        const brsq = new engine.Renderable();
        brsq.setColor([0.1, 0.1, 0.9, 1]);
        const blsq = new engine.Renderable();
        blsq.setColor([0.1, 0.1, 0.1, 1]);

        engine.clearCanvas([0.9, 0.9, 0.9, 1]);

        const gl = glSys.get();

        gl.viewport(20, 40, 600, 300);
        gl.scissor(20, 40, 600, 300);

        gl.enable(gl.SCISSOR_TEST);
        engine.clearCanvas([0.8, 0.8, 0.8, 1]);
        gl.disable(gl.SCISSOR_TEST);

        const cameraCenter = vec2.fromValues(20, 60);
        const wcSize = vec2.fromValues(20, 10);
        const cameraMatrix = mat4.create();

        mat4.scale(cameraMatrix, mat4.create(), vec3.fromValues(2.0 / wcSize[0], 2.0 / wcSize[1], 1.0));

        mat4.translate(cameraMatrix, cameraMatrix, vec3.fromValues(-cameraCenter[0], -cameraCenter[1], 1.0));


        blueSquare.getTransform().setPosition(20, 60);
        blueSquare.getTransform().setRadRotation(0.2);
        blueSquare.getTransform().setSize(5, 5);
        blueSquare.draw(cameraMatrix);

        redSquare.getTransform().setPosition(20, 60);
        redSquare.getTransform().setSize(2, 2);
        redSquare.draw(cameraMatrix);

        // top left
        TLSq.getTransform().setPosition(10, 65);
        TLSq.draw(cameraMatrix);

        // top right
        trsq.getTransform().setPosition(30, 65);
        trsq.draw(cameraMatrix);

        // bottom right
        brsq.getTransform().setPosition(20, 60);
        brsq.draw(cameraMatrix);

        // bottom left
        blsq.getTransform().setPosition(10, 55);
        blsq.draw(cameraMatrix);




    }
}