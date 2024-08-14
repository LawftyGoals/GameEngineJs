"use strict";

/**@type {WebGL2RenderingContext} */
let gl = null;

function getGL() {
  return gl;
}

window.onload = () => {
  initWebGL("GLCanvas");
  clearCanvas();
};

function initWebGL(htmlCanvasId) {
  let canvas = document.getElementById(htmlCanvasId);

  gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

  if (gl === null) {
    document.body.appendChild(document.createTextNode("No webgl2 =("));

    return;
  }

  gl.clearColor(0, 0.8, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function clearCanvas() {
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export { getGL };
