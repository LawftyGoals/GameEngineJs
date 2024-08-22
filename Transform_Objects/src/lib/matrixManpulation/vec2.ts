export function fromValues(x: number, y: number) {
  const out = new Float32Array(2);
  out[0] = x;
  out[1] = y;

  return out;
}
