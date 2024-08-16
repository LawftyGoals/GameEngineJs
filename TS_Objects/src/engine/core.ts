
let mGL: null | WebGL2RenderingContext = null;

export function getGL() {
    return mGL;
}

function initWebGL(htmlCanvasId: string) {
    const canvas: HTMLCanvasElement = document.getElementById(htmlCanvasId)! as HTMLCanvasElement;

    mGL = (canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2")) as WebGL2RenderingContext;

    if (mGL === null) {
        document.body.appendChild(document.createTextNode("No webgl2 =("));
        return;
    }

    mGL.clearColor(0, 0.8, 0, 1);

}

function clearCanvas() {
    if (mGL) mGL.clear(mGL.COLOR_BUFFER_BIT);
}

function drawSquare() {
    if (mGL) mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}
