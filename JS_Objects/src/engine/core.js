"use strict";

import * as vertexBuffer from "./vertex_buffer.js";
import * as simpleShader from "./shader_support.js";
import { SimpleShader } from "./simple_shader.js";

/**@type {WebGL2RenderingContext} */
let mGL = null;

function getGL() {
  return mGL;
}

window.onload = () => {
  initWebGL("GLCanvas");
  clearCanvas();
  drawSquare();
};

function initWebGL(htmlCanvasId) {
  let canvas = document.getElementById(htmlCanvasId);

  mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

  if (mGL === null) {
    document.body.appendChild(document.createTextNode("No webgl2 =("));
    return;
  }

  mGL.clearColor(0, 0.8, 0, 1);
  vertexBuffer.init();
  simpleShader.init("VertexShader", "FragmentShader");
}

function clearCanvas() {
  mGL.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare() {
  //Step A: Activate the sahder
  simpleShader.activate();

  // Step B draw the above settings
  mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

let mShader = null;
function createShader() {
  mShader = new SimpleShader("VertexShader", "FragmentShader");
}

export { getGL };
