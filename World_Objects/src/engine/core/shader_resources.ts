import { SimpleShader } from "./simple_shader.js";

let kSimpleVS = "src/engine/glsl_shaders/simple_vs.glsl";
let kSimpleFS = "src/engine/glsl_shaders/simple_fs.glsl";

let mConstColorShader: null | SimpleShader = null;

function createShaders(gl: WebGL2RenderingContext) {
  mConstColorShader = new SimpleShader(gl, kSimpleVS, kSimpleFS);
}

export function init(gl: WebGL2RenderingContext) {
  createShaders(gl);
}

export function getConstColorShader() {
  return mConstColorShader;
}
