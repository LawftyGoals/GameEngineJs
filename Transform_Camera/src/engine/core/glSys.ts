
let mGL: null | WebGL2RenderingContext = null;

export function init(htmlCanvasId: string) {
    const canvas = document.getElementById(htmlCanvasId) as HTMLCanvasElement;

    if (!canvas) throw new Error("canvas could not be loaded, check canvas name: " + htmlCanvasId);

    mGL = (canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2")) as WebGL2RenderingContext;

    if (!mGL) {
        const innerDiv = document.createElement("div");
        innerDiv.textContent = "No Webgl2 support";
        document.querySelector("body")?.appendChild(innerDiv);

        throw new Error("webgl2 context is not being set on: " + htmlCanvasId);
    }

}

export function get() {
    if (!mGL) throw new Error("mGL not initiated when attempting get.");
    return mGL;
}