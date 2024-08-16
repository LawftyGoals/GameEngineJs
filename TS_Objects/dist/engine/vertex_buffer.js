"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.init = init;
const core_js_1 = require("./core.js");
let mGLVertexBuffer = null;
function get() {
    return mGLVertexBuffer;
}
const verticesOfSquare = [
    0.5, 0.5, 0.0, -0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0,
];
function init() {
    const gl = (0, core_js_1.getGL)();
    if (gl) {
        mGLVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    }
    else {
        throw new Error("vertex_buffer failed to load gl context");
    }
}
//# sourceMappingURL=vertex_buffer.js.map