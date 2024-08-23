import * as glSys from "./core/glSys.js";
import * as shaderResources from "./core/shader_resources.js";
import { Transform } from "./transform.js";
export class Renderable {
    constructor() {
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = [1, 1, 1, 1];
        this.mTransform = new Transform();
    }
    draw() {
        const gl = glSys.get();
        this.mShader.activate(this.mColor, this.mTransform.getTRSMatrix());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    setColor(color) {
        this.mColor = color;
    }
    getColor() {
        return this.mColor;
    }
    getTransform() {
        return this.mTransform;
    }
}
//# sourceMappingURL=renderable.js.map