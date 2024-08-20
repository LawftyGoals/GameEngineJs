let mCanvas: null | HTMLCanvasElement = null;
let mGL: null | WebGL2RenderingContext = null;

export function get() {
  return mGL;
}

export function init(htmlCanvasId: string) {
  mCanvas = document.getElementById(htmlCanvasId) as HTMLCanvasElement | null;

  if (!mCanvas) {
    throw new Error(
      "Engine init [" + htmlCanvasId + "] HTML element id not found"
    );
  }

  mGL =
    mCanvas.getContext("webgl2") ||
    (mCanvas.getContext(
      "experimental-webgl2"
    ) as WebGL2RenderingContext | null);

  if (!mGL) {
    const innerDiv = document.createElement("div");
    innerDiv.textContent = "No Webgl2 support";
    document.querySelector("body")?.appendChild(innerDiv);
  }
}
