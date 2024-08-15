"use strict";

import * as vertexBuffer from "./vertex_buffer.js";
import * as simpleShader from "./shader_support.js";

/**@type {WebGL2RenderingContext} */
let gl = null;

function getGL() {
  return gl;
}

window.onload = () => {
  initWebGL("GLCanvas");
  clearCanvas();
  drawSquare();
};

function initWebGL(htmlCanvasId) {
  let canvas = document.getElementById(htmlCanvasId);

  gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

  if (gl === null) {
    document.body.appendChild(document.createTextNode("No webgl2 =("));
    return;
  }

  gl.clearColor(0, 0.8, 0, 1);
  vertexBuffer.init();
  simpleShader.init("VertexShader", "FragmentShader");
}

function clearCanvas() {
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function drawSquare() {
  //Step A: Activate the sahder
  simpleShader.activate();

  // Step B draw the above settings
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export { getGL };
