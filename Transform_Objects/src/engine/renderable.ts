import { getGL } from "./core/glSys.js";
import { SimpleShader } from "./core/simple_shader.js";
import * as shaderResources from "./core/shader_resources.js";

export type TVector4 = [number, number, number, number];

export class Renderable {
  mShader: SimpleShader;
  mColor: TVector4;

  constructor() {
    this.mShader = shaderResources.getConstColorShader();
    this.mColor = [1, 1, 1, 1];
  }

  draw() {
    const gl = getGL();
    this.mShader.activate(this.mColor);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  setColor(color: TVector4) {
    this.mColor = color;
  }

  getColor() {
    return this.mColor;
  }
}
