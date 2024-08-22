import * as vec2 from "../lib/matrixManpulation/vec2.js";

class Transform {
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
    this.mPosition[1] = posY;
  }
  getPosition() {
    return this.mPosition;
  }

  setPosX(posX: number) {
    this.mPosition[0] = posX;
  }
  setPosY(posY: number) {
    this.mPosition[1] = posY;
  }

  setSize(sizeX: number, sizeY: number) {
    this.setWidth(sizeX);
    this.setHeight(sizeY);
  }
  getSize() {
    return this.mScale;
  }

  setWidth(width: number) {
    this.mScale[0] = width;
  }
  setHeight(height: number) {
    this.mScale[1] = height;
  }

  setRadRotation(radians: number) {
    this.mRotationInRad = radians;
    while (this.mRotationInRad > 2 * Math.PI) {
      this.mRotationInRad -= 2 * Math.PI;
    }
  }
  setDegRotation(degrees: number) {
    this.setRadRotation((degrees * Math.PI) / 180.0);
  }
}
