let mCanvas = null;
let mGL = null;
export function get() {
    return mGL;
}
export function init(htmlCanvasId) {
    var _a;
    mCanvas = document.getElementById(htmlCanvasId);
    if (!mCanvas) {
        throw new Error("Engine init [" + htmlCanvasId + "] HTML element id not found");
    }
    mGL =
        mCanvas.getContext("webgl2") ||
            mCanvas.getContext("experimental-webgl2");
    if (!mGL) {
        const innerDiv = document.createElement("div");
        innerDiv.textContent = "No Webgl2 support";
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.appendChild(innerDiv);
    }
}
//# sourceMappingURL=gl.js.map