import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import { Renderable } from "./renderable.js";

export { Renderable };

export function init(htmlCanvasId: string) {
  glSys.init(htmlCanvasId);
  const gl = glSys.get() as WebGL2RenderingContext;
  vertexBuffer.init(gl);
  shaderResources.init(gl);
}

export function clearCanvas(color: number[]) {
  const gl = glSys.get() as WebGL2RenderingContext;
  gl.clearColor(color[0], color[1], color[2], color[3]);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
