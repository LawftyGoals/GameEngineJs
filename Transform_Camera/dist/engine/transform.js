import * as vec2 from "../matrixManpulation/vec2.js";
import * as vec3 from "../matrixManpulation/vec3.js";
import * as mat4 from "../matrixManpulation/mat4.js";
export class Transform {
    constructor() {
        this.mPosition = vec2.fromValues(0, 0);
        this.mScale = vec2.fromValues(1, 1);
        this.mRotationInRad = 0.0;
    }
    setPosition(posX, posY) {
        this.setPosX(posX);
        this.setPosY(posY);
    }
    incPosition(xInc, yInc) {
        this.incPosX(xInc);
        this.incPosY(yInc);
    }
    incPosY(yInc) {
        this.mPosition[1] += yInc;
    }
    incPosX(xInc) {
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
    setPosX(posX) {
        this.mPosition[0] = posX;
    }
    setPosY(posY) {
        this.mPosition[1] = posY;
    }
    incSize(sizeWidth, sizeHeight) {
        this.incWidth(sizeWidth);
        this.incHeight(sizeHeight);
    }
    incHeight(sizeHeight) {
        this.mScale[1] += sizeHeight;
    }
    incWidth(sizeWidth) {
        this.mScale[0] += sizeWidth;
    }
    setSize(sizeWidth, sizeHeight) {
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
    setWidth(width) {
        this.mScale[0] = width;
    }
    setHeight(height) {
        this.mScale[1] = height;
    }
    incRadRotation(radians) {
        this.mRotationInRad += radians;
    }
    setRadRotation(radians) {
        this.mRotationInRad = radians;
        while (this.mRotationInRad > 2 * Math.PI) {
            this.mRotationInRad -= (2 * Math.PI);
        }
    }
    setDegRotation(degrees) {
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
//# sourceMappingURL=transform.js.map