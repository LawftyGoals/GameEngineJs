import * as engine from "../engine/index.js";
window.onload = () => {
    new MyClass("GLCanvas");
};
class MyClass {
    constructor(htmlCanvasId) {
        engine.init(htmlCanvasId);
        this.mWhiteSq = new engine.Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new engine.Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);
        engine.clearCanvas([0, 0.8, 0, 1]);
        this.mWhiteSq.draw();
        this.mRedSq.draw();
    }
}
//# sourceMappingURL=my_game.js.map