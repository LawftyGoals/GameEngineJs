"use strict";

import * as vertexBuffer from "./vertex_buffer.js";
import * as simpleShader from "./shader_support.js";

/**@type {WebGL2RenderingContext} */
let mGL = null;
let mShader = null;

function getGL() {
  return mGL;
}

function initWebGL(htmlCanvasId) {
  let canvas = document.getElementById(htmlCanvasId);

  mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

  if (mGL === null) {
    document.body.appendChild(document.createTextNode("No webgl2 =("));
    return;
  }
}

function init(htmlCanvasId) {
  initWebGL(htmlCanvasId);
  vertexBuffer.init();
  createShader();
}

function clearCanvas(color) {
  mGL.clearColor(color[0], color[1], color[2], color[3]);
  mGL.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare() {
  //Step A: Activate the sahder
  simpleShader.activate();

  // Step B draw the above settings
  mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

function createShader() {
  mShader = new simpleShader("VertexShader", "FragmentShader");
}

export { getGL, init, clearCanvas, drawSquare };
