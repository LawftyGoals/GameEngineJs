"use strict";
import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

let mCompiledShader = null;
let vertexPositionRef = null;

function loadAndCompileShader(id, shaderType) {
  let shaderSource = null,
    compiledShader = null;

  // Step A: Get the shader source from index.html
  let shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;

  let gl = core.getGL();
  // Step B: Create shader based on type: vertex of fragment
  compiledShader = gl.createShader(shaderType);

  // Step C: Compile the created shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // Step D: check for errors and return results (null if error)
  // The log info is how shader compilation errors are displayed.
  // This is usefull for debugging the shaders.
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error(
      "A shader compiling error occured:\ntype:" +
        shaderType +
        "\nid: " +
        id +
        "\n" +
        gl.getShaderInfoLog(compiledShader)
    );
  }

  return compiledShader;
}

function init(vertexShaderID, fragmentShaderID) {
  let gl = core.getGL();

  // Step A: load and compile vertex and fragment shaders
  let vertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
  let fragmentShader = loadAndCompileShader(
    fragmentShaderID,
    gl.FRAGMENT_SHADER
  );

  // Step B: Create and link the shaders into a program
  mCompiledShader = gl.createProgram();
  gl.attachShader(mCompiledShader, vertexShader);
  gl.attachShader(mCompiledShader, fragmentShader);
  gl.linkProgram(mCompiledShader);

  // Step C: check for error
  if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
    throw new Error("Error linking shader");
  }

  // Step D: Gets reference to aVertexPosition attribute in the shader
  vertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPosition");
}

function activate() {
  // Step A: access to the webgl context
  let gl = core.getGL();

  // Step B: identify the compiled shader to use
  gl.useProgram(mCompiledShader);

  // Step C: bind vertex buffer to attribute defined in vertex shader
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
  gl.vertexAttribPointer(vertexPositionRef, 3, gl.FLOAT, false, 0, 0);

  //3 each element is 3 float (xyz)
  //glfloat data type is float
  //false if content is s normalized vectors
  // 0 bytes to skip in between elements
  // 0 offsets to first element

  gl.enableVertexAttribArray(vertexPositionRef);
}

export { init, activate };
