import { getGL } from "./glSys.js";

export class SimpleShader {

    gl: WebGL2RenderingContext;
    mVertexShader: WebGLShader;
    mFragmentShader: WebGLShader;
    mCompiledShaders: WebGLProgram | null;
    mVertexPositionRef: number;
    mPixelColorRef: WebGLUniformLocation | null;

    constructor(vertexShaderPath: string, fragmentShaderPath: string) {
        this.gl = getGL();

        this.mVertexShader = loadAndCompileShader(this.gl, vertexShaderPath, this.gl.VERTEX_SHADER);
        this.mFragmentShader = loadAndCompileShader(this.gl, fragmentShaderPath, this.gl.FRAGMENT_SHADER);

        this.mCompiledShaders = this.gl.createProgram();

        if (!this.mCompiledShaders) throw new Error("A program was not created for mCompiledShaders. ".concat(fragmentShaderPath, vertexShaderPath));

        this.gl.attachShader(this.mCompiledShaders, this.mVertexShader);
        this.gl.attachShader(this.mCompiledShaders, this.mFragmentShader);

        this.gl.linkProgram(this.mCompiledShaders);

        if (
            !this.gl.getProgramParameter(this.mCompiledShaders, this.gl.LINK_STATUS)
        ) {
            throw new Error("Error linking shader");
        }

        this.mVertexPositionRef = this.gl.getAttribLocation(this.mCompiledShaders, "aVertexPosition");
        this.mPixelColorRef = this.gl.getUniformLocation(this.mCompiledShaders, "uPixelColor");

        if (this.mVertexPositionRef === null || !this.mPixelColorRef) {
            throw new Error(
                `mVertexPsitionRef (${!this
                    .mVertexPositionRef}) or mPixelcolorRef (${!this
                        .mPixelColorRef}) is failing.`
            );
        }

    }

    activate(color: number[]) {
        this.gl.useProgram(this.mCompiledShaders);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, getVertexBuffer());
        this.gl.vertexAttribPointer(this.mVertexPositionRef, 3, this.gl.FLOAT, false, 0, 0);

        this.gl.enableVertexAttribArray(this.mVertexPositionRef);
        this.gl.uniform4fv(this.mPixelColorRef, color);
    }
}


function loadAndCompileShader(gl: WebGL2RenderingContext, filePath: string, shaderType: number) {

    const xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", filePath, false);



    try { xmlReq.send(); }
    catch (error) { throw new Error(`Failed to load shader: ${filePath} [Hint; project needs to run in server]\n${(error as Error).message}`); }

    const shaderSource = xmlReq.responseText;

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
        throw new Error(
            "A Shader compiling error occured " +
            gl.getShaderInfoLog(compiledShader) +
            filePath
        );
    }


    return compiledShader;

}