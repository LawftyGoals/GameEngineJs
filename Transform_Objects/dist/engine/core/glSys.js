let mGL = null;
export function init(htmlCanvasId) {
    var _a;
    const canvas = document.getElementById(htmlCanvasId);
    if (!canvas)
        throw new Error("canvas could not be loaded, check canvas name: " + htmlCanvasId);
    mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
    if (!mGL) {
        const innerDiv = document.createElement("div");
        innerDiv.textContent = "No Webgl2 support";
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.appendChild(innerDiv);
        throw new Error("webgl2 context is not being set on: " + htmlCanvasId);
    }
}
export function getGL() {
    if (!mGL) {
        throw new Error("mGL has not been initiated yet.");
    }
    return mGL;
}
//# sourceMappingURL=glSys.js.map