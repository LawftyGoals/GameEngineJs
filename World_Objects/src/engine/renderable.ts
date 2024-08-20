import * as glSys from "./core/gl.js";
import * as shaderResources from "./core/shader_resources.js";
import { SimpleShader } from "./core/simple_shader.js";

export class Renderable {
  mShader: SimpleShader;
  mColor: number[];

  constructor() {
    this.mShader = shaderResources.getConstColorShader() as SimpleShader;
    this.mColor = [1, 1, 1, 1];
  }

  draw() {
    let gl = glSys.get();
    this.mShader.activate(this.mColor);
    gl?.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  setColor(color: number[]) {
    this.mColor = color;
  }
  getColor() {
    return this.mColor;
  }
}
