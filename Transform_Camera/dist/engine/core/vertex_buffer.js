import * as glSys from "./glSys.js";
let mVertexBuffer = null;
export function init() {
    const gl = glSys.get();
    mVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.5, 0.5, 0, -0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0.0]), gl.STATIC_DRAW);
}
export function get() {
    if (!mVertexBuffer)
        throw new Error("mVertexBuffer is not initiated on get");
    return mVertexBuffer;
}
//# sourceMappingURL=vertex_buffer.js.map