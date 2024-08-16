import { getGL } from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

let mCompiledShader: WebGLProgram | null = null;
let vertexPositionRef = null;

function init(vertexShaderId: string, fragmentShaderId: string) {
    const gl = getGL();

    if (gl) {
        const vertexShader = loadAndCompileShader(vertexShaderId, gl.VERTEX_SHADER);
        const fragmentShader = loadAndCompileShader(fragmentShaderId, gl.FRAGMENT_SHADER);

        mCompiledShader = gl.createProgram() as WebGLProgram;
        gl.attachShader(mCompiledShader, vertexShader);
        gl.attachShader(mCompiledShader, fragmentShader);
        gl.linkProgram(mCompiledShader);

    }
    else {
        throw new Error("shader_support failed to load gl context")
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