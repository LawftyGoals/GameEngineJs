import * as vec2 from "../lib/matrixManpulation/vec2.js";
import * as vec3 from "../lib/matrixManpulation/vec3.js";
import * as mat4 from "../lib/matrixManpulation/mat4.js";

export class Transform {
  mPosition: Float32Array;
  mScale: Float32Array;
  mRotationInRad: number;

  constructor() {
    this.mPosition = vec2.fromValues(0, 0);
    this.mScale = vec2.fromValues(1, 1);
    this.mRotationInRad = 0.0;
  }
  setPosition(posX: number, posY: number) {
    this.setPosX(posX);
    this.setPosY(posY);
  }
  incPosition(xInc: number, yInc: number) {
    this.incPosX(xInc);
    this.incPosY(yInc);
  }
  incPosY(yInc: number) {
    this.mPosition[1] += yInc;
  }
  incPosX(xInc: number) {
    this.mPosition[0] += xInc;
  }
  getPosition() {
    return this.mPosition;
  }
  getXPos() {
    return this.mPosition[0];
  }
  getYPos() {
    return this.mPosition[1];
  }

  setPosX(posX: number) {
    this.mPosition[0] = posX;
  }
  setPosY(posY: number) {
    this.mPosition[1] = posY;
  }

  incSize(sizeWidth: number, sizeHeight: number) {
    this.incWidth(sizeWidth);
    this.incHeight(sizeHeight);
  }
  incHeight(sizeHeight: number) {
    this.mScale[1] += sizeHeight;
  }
  incWidth(sizeWidth: number) {
    this.mScale[0] += sizeWidth;
  }
  setSize(sizeWidth: number, sizeHeight: number) {
    this.setWidth(sizeWidth);
    this.setHeight(sizeHeight);
  }
  getSize() {
    return this.mScale;
  }
  getWidth() {
    return this.mScale[0];
  }
  getHeight() {
    return this.mScale[1];
  }

  setWidth(width: number) {
    this.mScale[0] = width;
  }
  setHeight(height: number) {
    this.mScale[1] = height;
  }

  incRadRotation(radians: number) {
    this.mRotationInRad += radians;
  }
  setRadRotation(radians: number) {
    this.mRotationInRad = radians;
    while (this.mRotationInRad > 2 * Math.PI) {
      this.mRotationInRad -= (2 * Math.PI);
    }
  }
  setDegRotation(degrees: number) {
    this.setRadRotation((degrees * Math.PI) / 180.0);
  }

  getRadRotation() { return this.mRotationInRad; }


  getTRSMatrix() {
    const matrix = mat4.create();

    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
    mat4.rotateZ(matrix, matrix, this.getRadRotation());
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

    return matrix;
  }
}
