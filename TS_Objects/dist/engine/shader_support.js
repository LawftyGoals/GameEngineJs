import { getGL } from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";
let mCompiledShader = null;
let vertexPositionRef = null;
export function init(gl, vertexShaderId, fragmentShaderId) {
    let vertexShader;
    let fragmentShader;
    if (gl) {
        vertexShader = loadAndCompileShader(vertexShaderId, gl.VERTEX_SHADER);
        fragmentShader = loadAndCompileShader(fragmentShaderId, gl.FRAGMENT_SHADER);
    }
    else {
        throw new Error("shader_support failed to load gl context");
    }
    mCompiledShader = gl.createProgram();
    gl.attachShader(mCompiledShader, vertexShader);
    gl.attachShader(mCompiledShader, fragmentShader);
    gl.linkProgram(mCompiledShader);
    if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
        throw new Error("Error linking shader");
    }
    vertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPosition");
}
export function activate(gl) {
    gl.useProgram(mCompiledShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
    if (vertexPositionRef) {
        gl.vertexAttribPointer(vertexPositionRef, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPositionRef);
    }
    else {
        throw new Error("vertexPositionRef is not initiated by activate");
    }
}
function loadAndCompileShader(id, shaderType) {
    //let shaderSource = null, compiledShader = null;
    var _a;
    const shaderText = document.getElementById(id);
    const shaderSource = (_a = shaderText.firstChild) === null || _a === void 0 ? void 0 : _a.textContent;
    const gl = getGL();
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