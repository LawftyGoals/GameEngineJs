import * as glSys from "./core/glSys.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import { Renderable } from "./renderable.js";
export { Renderable };
export function init(htmlCanvasId) {
    glSys.init(htmlCanvasId);
    const gl = glSys.getGL();
    vertexBuffer.init();
    shaderResources.init();
}
export function clearCanvas(color) {
    const gl = glSys.getGL();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
//# sourceMappingURL=index.js.map