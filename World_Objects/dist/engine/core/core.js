import { SimpleShader } from "./simple_shader.js";
import { init as initVertexBuffer } from "./vertex_buffer.js";
let mGL = null;
let mShader = null;
export function init(htmlCanvasId) {
    initWebGL(htmlCanvasId);
    if (!mGL) {
        throw new Error("mGL is not beingin initiated in initWebGL");
    }
    initVertexBuffer(mGL);
    createShader(mGL);
}
function initWebGL(htmlCanvasId) {
    var _a;
    const canvas = document.getElementById(htmlCanvasId);
    mGL =
        canvas.getContext("webgl2") ||
            canvas.getContext("webgl2-experimental");
    if (!mGL) {
        const innerP = document.createElement("p");
        innerP.textContent = "webgl2 failed to initialize";
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.appendChild(innerP);
        throw new Error("webgl2 failed to initialize");
    }
}
function createShader(gl) {
    mShader = new SimpleShader(gl, "src/engine/glsl_shaders/simple_vs.glsl", "src/engine/glsl_shaders/simple_fs.glsl");
}
export function clearCanvas(color) {
    if (mGL) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    }
}
export function drawSquare(color) {
    if (mShader && mGL) {
        mShader.activate(color);
        mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
    }
    else if (!mShader) {
        throw new Error("mShader is not being initialized in drawSquare");
    }
    else if (!mGL) {
        throw new Error("mGL is not being initialized in drawSquare");
    }
}
//# sourceMappingURL=core.js.map