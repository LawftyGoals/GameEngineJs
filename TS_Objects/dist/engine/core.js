"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGL = getGL;
let mGL = null;
function getGL() {
    return mGL;
}
function initWebGL(htmlCanvasId) {
    const canvas = document.getElementById(htmlCanvasId);
    mGL = (canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2"));
    if (mGL === null) {
        document.body.appendChild(document.createTextNode("No webgl2 =("));
        return;
    }
    mGL.clearColor(0, 0.8, 0, 1);
}
function clearCanvas() {
    if (mGL)
        mGL.clear(mGL.COLOR_BUFFER_BIT);
}
function drawSquare() {
    if (mGL)
        mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}
//# sourceMappingURL=core.js.map