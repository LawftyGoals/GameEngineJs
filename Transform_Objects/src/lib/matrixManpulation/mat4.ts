export function create() {
  const out = new Float32Array(16);

  out.forEach((_, index, outArray) => {
    outArray[index] = index % 5 === 0 ? 1 : 0;
  });

  return out;
}

export function translate(
  out: Float32Array,
  toTranslate: Float32Array,
  vector: Float32Array
) {
  const x = vector[0],
    y = vector[1],
    z = vector[2];

  if (toTranslate === out) {
    for (let i = 0; i < 4; i++) {
      out[i + 12] =
        toTranslate[i] * x +
        toTranslate[i + 4] * y +
        toTranslate[i + 8] * z +
        toTranslate[i + 12];
    }
  } else {
    for (let j = 0; j < 12; j++) {
      out[j] = toTranslate[j];
    }

    for (let k = 0; k < 4; k++) {
      out[k + 12] =
        toTranslate[k] * x +
        toTranslate[k + 4] * y +
        toTranslate[k + 8] * z +
        toTranslate[k + 12];
    }
  }
  return out;
}

export function rotateZ(
  out: Float32Array,
  toTranslate: Float32Array,
  radians: number
) {
  let sin = Math.sin(radians);
  let cos = Math.cos(radians);

  let [a00, a01, a02, a03, a10, a11, a12, a13] = toTranslate;

  if (toTranslate !== out) {
    for (let i = 8; i < 16; i++) {
      out[i] = toTranslate[i];
    }
  }

  out[0] = a00 * cos + a10 * sin;
  out[1] = a01 * cos + a11 * sin;
  out[2] = a02 * cos + a12 * sin;
  out[3] = a03 * cos + a13 * sin;
  out[4] = a10 * cos - a00 * sin;
  out[5] = a11 * cos - a01 * sin;
  out[6] = a12 * cos - a02 * sin;
  out[7] = a13 * cos - a03 * sin;

  return out;
}

export function scale(
  out: Float32Array,
  toTranslate: Float32Array,
  vector: Float32Array
) {
  const [x, y, z] = vector;

  for (let i = 0; i < 4; i++) {
    out[i] = toTranslate[i] * x;
    out[i + 4] = toTranslate[i + 4] * y;
    out[i + 8] = toTranslate[i + 8] * z;
    out[i + 12] = toTranslate[i + 12];
  }

  return out;
}

export function identity(out: Float32Array) {
  out.forEach((_, index, outArray) => {
    outArray[index] = index % 5 === 0 ? 1 : 0;
  });

  return out;
}
