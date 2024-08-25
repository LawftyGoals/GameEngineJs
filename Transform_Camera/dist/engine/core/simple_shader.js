import * as glSys from "./glSys.js";
import * as vertexBuffer from "./vertex_buffer.js";
export class SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath) {
        this.gl = glSys.get();
        this.mVertexShader = loadAndComipleShader(vertexShaderPath, this.gl.VERTEX_SHADER);
        this.mFrgamentShader = loadAndComipleShader(fragmentShaderPath, this.gl.FRAGMENT_SHADER);
        this.mCompiledShaders = this.gl.createProgram();
        if (!this.mCompiledShaders)
            throw new Error("failed to create a program when create a simple shader: " + fragmentShaderPath + " " + vertexShaderPath);
        this.gl.attachShader(this.mCompiledShaders, this.mVertexShader);
        this.gl.attachShader(this.mCompiledShaders, this.mFrgamentShader);
        this.gl.linkProgram(this.mCompiledShaders);
        if (!this.gl.getProgramParameter(this.mCompiledShaders, this.gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
        }
        this.mVertexPositionRef = this.gl.getAttribLocation(this.mCompiledShaders, "aVertexPosition");
        this.mPixelColorRef = this.gl.getUniformLocation(this.mCompiledShaders, "uPixelColor");
        this.mModelMatrixRef = this.gl.getUniformLocation(this.mCompiledShaders, "uModelXformMatrix");
        this.mCameraMatrixRef = this.gl.getUniformLocation(this.mCompiledShaders, "uCameraXformMatrix");
    }
    activate(color, trsMatrix, cameraMatrix) {
        const gl = glSys.get();
        gl.useProgram(this.mCompiledShaders);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(this.mVertexPositionRef, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mVertexPositionRef);
        gl.uniform4fv(this.mPixelColorRef, color);
        gl.uniformMatrix4fv(this.mModelMatrixRef, false, trsMatrix);
        gl.uniformMatrix4fv(this.mCameraMatrixRef, false, cameraMatrix);
    }
}
function loadAndComipleShader(shaderPath, shaderType) {
    const gl = glSys.get();
    const xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", shaderPath, false);
    try {
        xmlReq.send();
    }
    catch (error) {
        throw new Error(`Failed: Attempting to get ${shaderPath}.\n` + error.message);
    }
    const shaderSource = xmlReq.responseText;
    if (!shaderSource) {
        throw new Error("Warning: Loading of [" + shaderPath + "] failed.");
    }
    const compiledShader = gl.createShader(shaderType);
    if (!compiledShader) {
        throw new Error("Shader creating failed: " + shaderPath);
    }
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A Shader compiling error occured " +
            gl.getShaderInfoLog(compiledShader) +
            shaderPath);
    }
    return compiledShader;
}
//# sourceMappingURL=simple_shader.js.map