import * as vertexBuffer from "./vertex_buffer.js";
export class SimpleShader {
    constructor(mGL, vertexShaderId, fragmentShaderId) {
        this.gl = mGL;
        this.mVertexShader = loadAndCompileShader(this.gl, vertexShaderId, this.gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(this.gl, fragmentShaderId, this.gl.FRAGMENT_SHADER);
        this.mCompiledShader = this.gl.createProgram();
        if (!this.mCompiledShader) {
            throw new Error("mCompiledShader is not getting created");
        }
        this.gl.attachShader(this.mCompiledShader, this.mVertexShader);
        this.gl.attachShader(this.mCompiledShader, this.mFragmentShader);
        this.gl.linkProgram(this.mCompiledShader);
        if (!this.gl.getProgramParameter(this.mCompiledShader, this.gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
        }
        this.mVertexPositionRef = this.gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");
    }
    activate() {
        this.gl.useProgram(this.mCompiledShader);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.get());
        this.gl.vertexAttribPointer(this.mVertexPositionRef, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.mVertexPositionRef);
    }
}
/*function loadAndCompileShader(gl: WebGL2RenderingContext, id: string, shaderType: number) {
    const shaderText = document.getElementById(id);

    if (!shaderText || !shaderText.firstChild || !shaderText.firstChild.textContent) {
        throw new Error("shaderText is not getting an element or firstChild");
    }

    const shaderSource: string = shaderText.firstChild.textContent;
    const compiledShader = gl.createShader(shaderType);

    if (!compiledShader) {
        throw new Error(`shader of type ${shaderType} is not being created in loadAndCompileShader`);
    }

    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("Ashader compiling error occured: " + gl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;

}*/
function loadAndCompileShader(gl, filePath, shaderType) {
    const xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", filePath, false);
    try {
        xmlReq.send();
    }
    catch (error) {
        throw new Error(`failed to load shader: ${filePath} [HINT: project needs server to run]\n${error.message}`);
    }
    const shaderSource = xmlReq.responseText;
    const compiledShader = gl.createShader(shaderType);
    if (!compiledShader) {
        throw new Error(`shader of type ${shaderType} is not being created in loadAndCompileShader`);
    }
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("Ashader compiling error occured: " + gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}
//# sourceMappingURL=simple_shader.js.map