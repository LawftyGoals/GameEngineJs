import { SimpleShader } from "../simple_shader.js";
import { init as initVertexBuffer } from "../vertex_buffer.js";

let mGL: null | WebGL2RenderingContext = null;
let mShader: null | SimpleShader = null;

export function init(htmlCanvasId: string) {
    initWebGL(htmlCanvasId);

    if (!mGL) {
        throw new Error("mGL is not beingin initiated in initWebGL");
    }

    initVertexBuffer(mGL);
    createShader(mGL);

}

function initWebGL(htmlCanvasId: string) {
    const canvas: HTMLCanvasElement = document.getElementById(htmlCanvasId) as HTMLCanvasElement;

    mGL = canvas.getContext("webgl2") || canvas.getContext("webgl2-experimental") as WebGL2RenderingContext;

    if (!mGL) {
        const innerP: HTMLElement = document.createElement("p");
        innerP.textContent = "webgl2 failed to initialize";
        document.querySelector("body")?.appendChild(innerP);
        throw new Error("webgl2 failed to initialize")
    }

}

function createShader(gl: WebGL2RenderingContext) {
    mShader = new SimpleShader(gl, "src/engine/glsl_shaders/simple_vs.glsl", "src/engine/glsl_shaders/simple_fs.glsl");
}

export function clearCanvas(color: number[]) {
    if (mGL) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    }
}

export function drawSquare(color: number[]) {
    if (mShader && mGL) {
        mShader.activate(color);
        mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
    } else if (!mShader) {
        throw new Error("mShader is not being initialized in drawSquare");
    } else if (!mGL) {
        throw new Error("mGL is not being initialized in drawSquare")
    }
}