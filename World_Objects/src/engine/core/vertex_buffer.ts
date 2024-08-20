
let mGLVertexBuffer: null | WebGLBuffer = null;

const verticesOfSquare = [
    0.5, 0.5, 0.0, -0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0,];


export function init(gl: WebGL2RenderingContext) {
    mGLVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
}

export function getVertexBuffer() {
    return mGLVertexBuffer;
}