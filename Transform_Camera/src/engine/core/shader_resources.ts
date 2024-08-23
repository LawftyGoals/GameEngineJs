import { SimpleShader } from "./simple_shader.js";

const kSimpleVS = "src/glsl_shaders/simple_vs.glsl";
const kSimpleFS = "src/glsl_shaders/simple_fs.glsl";

let mConstColorShader: null | SimpleShader = null;

export function init() {
    createShaders();
}

function createShaders() {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

export function getConstColorShader() {
    if (!mConstColorShader) throw new Error("Failure: mConstColorShader not initiated");
    return mConstColorShader;
}
