import * as glSys from "./core/glSys.js";
import { SimpleShader } from "./core/simple_shader.js";
import * as shaderResources from "./core/shader_resources.js";
import { Transform } from "./transform.js";

export class Renderable {
    mShader: SimpleShader;
    mColor: [number, number, number, number];
    mTransform: Transform;

    constructor() {
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = [1, 1, 1, 1];
        this.mTransform = new Transform();
    }

    draw(cameraMatrix: Iterable<GLfloat>) {
        const gl = glSys.get();
        this.mShader.activate(this.mColor, this.mTransform.getTRSMatrix(), cameraMatrix);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    setColor(color: [number, number, number, number]) {
        this.mColor = color;
    }
    getColor() {
        return this.mColor;
    }

    getTransform() {
        return this.mTransform;
    }

}