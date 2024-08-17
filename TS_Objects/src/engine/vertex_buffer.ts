let mGLVertexBuffer: WebGLBuffer | null = null;

export function get() {
    return mGLVertexBuffer;
}

const verticesOfSquare = [
    0.5, 0.5, 0.0, -0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0,];

export function init(gl: WebGL2RenderingContext) {

    if (gl) {
        mGLVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

    } else {
        throw new Error("vertex_buffer failed to load gl context");
    }

}