import { getGL } from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

let mCompiledShader: WebGLProgram | null = null;
let vertexPositionRef: GLint | null = null;

export function init(gl: WebGL2RenderingContext, vertexShaderId: string, fragmentShaderId: string) {

    let vertexShader;
    let fragmentShader


    if (gl) {
        vertexShader = loadAndCompileShader(vertexShaderId, gl.VERTEX_SHADER);
        fragmentShader = loadAndCompileShader(fragmentShaderId, gl.FRAGMENT_SHADER);
    }
    else {
        throw new Error("shader_support failed to load gl context")
    }

    mCompiledShader = gl.createProgram() as WebGLProgram;
    gl.attachShader(mCompiledShader, vertexShader);
    gl.attachShader(mCompiledShader, fragmentShader);
    gl.linkProgram(mCompiledShader);

    if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
        throw new Error("Error linking shader");
    }


    vertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPosition");

}

export function activate(gl: WebGL2RenderingContext) {


    gl.useProgram(mCompiledShader);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());

    if (vertexPositionRef) {
        gl.vertexAttribPointer(vertexPositionRef, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPositionRef);
    } else {
        throw new Error("vertexPositionRef is not initiated by activate");
    }

}


function loadAndCompileShader(id: string, shaderType: number) {
    //let shaderSource = null, compiledShader = null;

    const shaderText: HTMLScriptElement = document.getElementById(id) as HTMLScriptElement;

    const shaderSource = shaderText.firstChild?.textContent as string;

    const gl = getGL();
    let compiledShader: WebGLShader;

    if (gl) {

        compiledShader = gl.createShader(shaderType) as WebGLShader;

        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);

        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            throw new Error(
                "A shader compiling error occured:\ntype:" +
                shaderType +
                "\nid: " +
                id +
                "\n" +
                gl.getShaderInfoLog(compiledShader)
            );
        }
        return compiledShader;
    } else {
        throw new Error("loadAndCompileShader in shader_support failed to load gl context");
    }


}