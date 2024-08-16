"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_js_1 = require("./core.js");
let mCompiledShader = null;
let vertexPositionRef = null;
function init(vertexShaderId, fragmentShaderId) {
    const gl = (0, core_js_1.getGL)();
    if (gl) {
        const vertexShader = loadAndCompileShader(vertexShaderId, gl.VERTEX_SHADER);
        const fragmentShader = loadAndCompileShader(fragmentShaderId, gl.FRAGMENT_SHADER);
        mCompiledShader = gl.createProgram();
        gl.attachShader(mCompiledShader, vertexShader);
        gl.attachShader(mCompiledShader, fragmentShader);
        gl.linkProgram(mCompiledShader);
    }
    else {
        throw new Error("shader_support failed to load gl context");
    }
}
function loadAndCompileShader(id, shaderType) {
    //let shaderSource = null, compiledShader = null;
    var _a;
    const shaderText = document.getElementById(id);
    const shaderSource = (_a = shaderText.firstChild) === null || _a === void 0 ? void 0 : _a.textContent;
    const gl = (0, core_js_1.getGL)();
    let compiledShader;
    if (gl) {
        compiledShader = gl.createShader(shaderType);
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);
        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            throw new Error("A shader compiling error occured:\ntype:" +
                shaderType +
                "\nid: " +
                id +
                "\n" +
                gl.getShaderInfoLog(compiledShader));
        }
        return compiledShader;
    }
    else {
        throw new Error("loadAndCompileShader in shader_support failed to load gl context");
    }
}
//# sourceMappingURL=shader_support.js.map