import { getVertexBuffer } from "./vertex_buffer.js";

export class SimpleShader {

    gl: WebGL2RenderingContext;
    mVertexShader: WebGLShader;
    mFragmentShader: WebGLShader;
    mCompiledShader: WebGLProgram | null;
    mVertexPositionRef: number;
    mPixelColorRef: WebGLUniformLocation | null;

    constructor(mGL: WebGL2RenderingContext, vertexShaderId: string, fragmentShaderId: string) {
        this.gl = mGL;

        this.mVertexShader = loadAndCompileShader(this.gl, vertexShaderId, this.gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(this.gl, fragmentShaderId, this.gl.FRAGMENT_SHADER);

        this.mCompiledShader = this.gl.createProgram();

        if (!this.mCompiledShader) {
            throw new Error("shader program was not created in simpleShader class: " + vertexShaderId + " " + fragmentShaderId);
        }

        this.gl.attachShader(this.mCompiledShader, this.mVertexShader);
        this.gl.attachShader(this.mCompiledShader, this.mFragmentShader);

        this.gl.linkProgram(this.mCompiledShader);

        if (!this.gl.getProgramParameter(this.mCompiledShader, this.gl.LINK_STATUS)) {
            throw new Error("Error linking shader");
        }

        this.mVertexPositionRef = this.gl.getAttribLocation(this.mCompiledShader, "aVertexPosition");
        console.log(this.mVertexPositionRef)
        this.mPixelColorRef = this.gl.getUniformLocation(this.mCompiledShader, "uPixelColor");

        if (this.mVertexPositionRef === null || !this.mPixelColorRef) {
            throw new Error(`mVertexPsitionRef (${!this.mVertexPositionRef}) or mPixelcolorRef (${!this.mPixelColorRef}) is failing.`)
        }
    }

    activate(pixelColor: number[]) {
        this.gl.useProgram(this.mCompiledShader);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, getVertexBuffer());
        this.gl.vertexAttribPointer(this.mVertexPositionRef, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.mVertexPositionRef);
        this.gl.uniform4fv(this.mPixelColorRef, pixelColor);

    }

}

function loadAndCompileShader(gl: WebGL2RenderingContext, filePath: string, shaderType: number) {
    const xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", filePath, false);

    try {
        xmlReq.send();
    } catch (error) {
        throw new Error(`failed to load shader: ${filePath}[HINT: project needs server to run]\n${(error as Error).message}`)
    }

    const shaderSource = xmlReq.responseText;

    if (!shaderSource) {
        throw new Error("Warning: Loading of: " + filePath + " failed!");
    }

    const compiledShader = gl.createShader(shaderType);

    if (!compiledShader) {
        throw new Error(`shader of type ${shaderType} is not being created in loadAndCompileShader`);
    }

    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);

    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        throw new Error("A Shader compiling error occured " + gl.getShaderInfoLog(compiledShader) + filePath);
    }

    return compiledShader;

}