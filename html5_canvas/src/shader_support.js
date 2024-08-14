"use strict";
import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

let compiledShader = null;
let vertexPositionRef = null;

function loadAndCompileShader(id, shaderType) {
  let shaderSource = null;
  let intCompiledShader = null;

  // Step A: Get the shader source from index.html
  let shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContext;

  let gl = core.getGL();
  // Step B: Create shader based on type: vertex of fragment
  intCompiledShader = gl.createShader(shaderType);

  // Step C: Compile the created shader
  gl.shaderSource(intCompiledShader, shaderSource);
  gl.compileShader(intCompiledShader);

  // Step D: check for errors and return results (null if error)
  // The log info is how shader compilation errors are displayed.
  // This is usefull for debugging the shaders.
  if (!gl.getShaderParameter(intCompiledShader, gl.COMPILE_STATUS)) {
    throw new Error(
      "A shader compiling error occured: " +
        gl.getShaderInfoLog(intCompiledShader)
    );
  }

  return intCompiledShader;
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
  compiledShader = gl.createProgram();
  gl.attachShader(compiledShader, vertexShader);
  gl.attachShader(compiledShader, fragmentShader);
  gl.linkProgram(compiledShader);

  // Step C: check for error
  if (!gl.getProgramParameter(compiledShader, gl.LINK_STATUS)) {
    throw new Error("Error linking shader");
  }

  // Step D: Gets reference to aVertexPosition attribute in the shader
  vertexPositionRef = gl.getAttribLocation(compiledShader, "aVertexPosition");
}

function activate() {
  // Step A: access to the webgl context
  let gl = core.getGL();

  // Step B: identify the compiled shader to use
  gl.useProgram(compiledShader);

  // Step C: bind vertex buffer to attribute defined in vertex shader
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
  gl.vertexAttribPointer(this.vertexPositionRef, 3, gl.FLOAT, false, 0, 0);

  //3 each element is 3 float (xyz)
  //glfloat data type is float
  //false if content is s normalized vectors
  // 0 bytes to skip in between elements
  // 0 offsets to first element

  gl.enableVertexAttribArray(this.vertexPositionRef);
}

export { init, activate };
