import * as glSys from "./core/glSys.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import { Renderable } from "./renderable.js";
import { Transform } from "./transform.js";

export { Renderable, Transform };

export function init(htmlCanvasId: string) {
    glSys.init(htmlCanvasId);
    vertexBuffer.init()
    shaderResources.init();
}

export function clearCanvas(color: [number, number, number, number]) {
    const gl = glSys.get();
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
}