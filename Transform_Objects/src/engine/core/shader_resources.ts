import { SimpleShader } from "./simple_shader.js";

const kSimpleVS = "src/engine/glsl_shaders/simple_vs.glsl";
const kSimpleFS = "src/engine/glsl_shaders/simple_fs.glsl";

let mConstColorShader: null | SimpleShader = null;

function createShaders() {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

export function init() {
  createShaders();
}

export function getConstColorShader() {
  if (!mConstColorShader)
    throw new Error("SimpleShader is not finalizing shader setup.");
  return mConstColorShader;
}
