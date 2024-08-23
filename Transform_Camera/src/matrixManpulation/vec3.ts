export function fromValues(x: number, y: number, z: number) {
  const out = new Float32Array(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;

  return out;
}
