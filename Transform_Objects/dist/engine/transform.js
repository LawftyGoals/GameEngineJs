import * as vec2 from "../lib/matrixManpulation/vec2.js";
class Transform {
    constructor() {
        this.mPosition = vec2.fromValues(0, 0);
        this.mScale = vec2.fromValues(1, 1);
        this.mRotationInRad = 0.0;
    }
    setPosition(posX, posY) {
        this.setPosX(posX);
        this.mPosition[1] = posY;
    }
    getPosition() {
        return this.mPosition;
    }
    setPosX(posX) {
        this.mPosition[0] = posX;
    }
    setPosY(posY) {
        this.mPosition[1] = posY;
    }
    setSize(sizeX, sizeY) {
        this.setWidth(sizeX);
        this.setHeight(sizeY);
    }
    getSize() {
        return this.mScale;
    }
    setWidth(width) {
        this.mScale[0] = width;
    }
    setHeight(height) {
        this.mScale[1] = height;
    }
    setRadRotation(radians) {
        this.mRotationInRad = radians;
        while (this.mRotationInRad > 2 * Math.PI) {
            this.mRotationInRad -= 2 * Math.PI;
        }
    }
    setDegRotation(degrees) {
        this.setRadRotation((degrees * Math.PI) / 180.0);
    }
}
//# sourceMappingURL=transform.js.map