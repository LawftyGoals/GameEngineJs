import * as vertexBuffer from "./vertex_buffer.js";
import { SimpleShader } from "./simple_shader.js";
let mGL = null;
let mShader = null;
export function getGL() {
    return mGL;
}
export function init(htmlCanvasId) {
    initWebGL(htmlCanvasId);
    if (!mGL) {
        throw new Error("mGL is not being initiated by initWebGL");
    }
    vertexBuffer.init(mGL);
    createShader(mGL);
}
function createShader(gl) {
    mShader = new SimpleShader(gl, "VertexShader", "FragmentShader");
}
function initWebGL(htmlCanvasId) {
    const canvas = document.getElementById(htmlCanvasId);
    mGL = (canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2"));
    if (mGL === null) {
        document.body.appendChild(document.createTextNode("No webgl2 =("));
        return;
    }
}
export function clearCanvas(color) {
    if (mGL) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    }
}
export function drawSquare() {
    if (mShader && mGL) {
        mShader.activate();
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