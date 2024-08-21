import { getGL } from "./glSys.js";
import { getVertexBuffer } from "./vertex_buffer.js";
export class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        this.gl = getGL();
        this.mVertexShader = loadAndCompileShader(this.gl, vertexShaderPath, this.gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(this.gl, fragmentShaderPath, this.gl.FRAGMENT_SHADER);
        console.log(vertexShaderPath);
        this.mCompiledShaders = this.gl.createProgram();
        if (!this.mCompiledShaders) {
            throw new Error("A program was not created for mCompiledShaders. ".concat(fragmentShaderPath, vertexShaderPath));
        }
        this.gl.attachShader(this.mCompiledShaders, this.mVertexShader);
        this.gl.attachShader(this.mCompiledShaders, this.mFragmentShader);
        this.gl.linkProgram(this.mCompiledShaders);
        if (!this.gl.getProgramParameter(this.mCompiledShaders, this.gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
        }
        this.mVertexPositionRef = this.gl.getAttribLocation(this.mCompiledShaders, "aVertexPosition");
        this.mPixelColorRef = this.gl.getUniformLocation(this.mCompiledShaders, "uPixelColor");
        console.log(this.mPixelColorRef);
        if (this.mVertexPositionRef === null || !this.mPixelColorRef) {
            throw new Error(`mVertexPsitionRef (${this.mVertexPositionRef === 0 ? false : !this.mVertexPositionRef}) or mPixelcolorRef (${!this.mPixelColorRef}) is failing.`);
        }
    }
    activate(color) {
        this.gl.useProgram(this.mCompiledShaders);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, getVertexBuffer());
        this.gl.vertexAttribPointer(this.mVertexPositionRef, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.mVertexPositionRef);
        this.gl.uniform4fv(this.mPixelColorRef, color);
    }
}
function loadAndCompileShader(gl, filePath, shaderType) {
    const xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", filePath, false);
    try {
        xmlReq.send();
    }
    catch (error) {
        throw new Error(`Failed to load shader: ${filePath} [Hint; project needs to run in server]\n${error.message}`);
    }
    const shaderSource = xmlReq.responseText;
    console.log(shaderSource);
    if (!shaderSource) {
        throw new Error("Warning: Loading of [" + filePath + "] failed.");
    }
    const compiledShader = gl.createShader(shaderType);
    if (!compiledShader) {
        throw new Error("Shader creating failed: " + filePath);
    }
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A Shader compiling error occured " +
            gl.getShaderInfoLog(compiledShader) +
            filePath);
    }
    return compiledShader;
}
//# sourceMappingURL=simple_shader.js.map