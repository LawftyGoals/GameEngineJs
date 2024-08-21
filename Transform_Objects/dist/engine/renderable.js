import { getGL } from "./core/glSys.js";
import * as shaderResources from "./core/shader_resources.js";
export class Renderable {
    constructor() {
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = [1, 1, 1, 1];
    }
    draw() {
        let gl = getGL();
        this.mShader.activate(this.mColor);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    setColor(color) {
        this.mColor = color;
    }
    getColor() {
        return this.mColor;
    }
}
//# sourceMappingURL=renderable.js.map