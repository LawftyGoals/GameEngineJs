import * as core from "../engine/core/core.js"

window.onload = () => {
    new MyClass("GLCanvas");
}

class MyClass {
    constructor(htmlCanvasId: string) {
        core.init(htmlCanvasId);
        core.clearCanvas([1, 0, 1, 1]);
        core.drawSquare([0, 1, 0, 1]);

    }
}