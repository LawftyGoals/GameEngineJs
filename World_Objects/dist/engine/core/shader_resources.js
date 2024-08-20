import { SimpleShader } from "./simple_shader.js";
let kSimpleVS = "src/engine/glsl_shaders/simple_vs.glsl";
let kSimpleFS = "src/engine/glsl_shaders/simple_fs.glsl";
let mConstColorShader = null;
function createShaders(gl) {
    mConstColorShader = new SimpleShader(gl, kSimpleVS, kSimpleFS);
}
export function init(gl) {
    createShaders(gl);
}
export function getConstColorShader() {
    return mConstColorShader;
}
//# sourceMappingURL=shader_resources.js.map