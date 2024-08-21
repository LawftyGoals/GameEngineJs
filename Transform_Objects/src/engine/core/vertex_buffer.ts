import { getGL } from "./glSys.js";

let mVertexBuffer: null | WebGLBuffer = null;

const verticesOfSquares = [
  0.5, 0.5, 0, -0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0,
];

export function init() {
  const gl = getGL();

  mVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mVertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(verticesOfSquares),
    gl.STATIC_DRAW
  );
}

export function getVertexBuffer() {
  return mVertexBuffer;
}
