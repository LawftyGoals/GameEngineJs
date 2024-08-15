"use strict";

import * as core from "./core.js";

let glVertexBuffer = null;

function get() {
  return glVertexBuffer;
}

let vertciesOfSquare = [
  0.5, 0.5, 0.0, -0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0,
];

function init() {
  let gl = core.getGL();
  glVertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, glVertexBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertciesOfSquare),
    gl.STATIC_DRAW
  );

  
}

export { init, get };
