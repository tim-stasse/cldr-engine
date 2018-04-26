/**
 * Compute floor(n / d) and store the remainder in r[0]
 */
export const floorDiv = (n: number, d: number, r: [number]) => {
  const q = Math.floor(n / d);
  r[0] = n % d;
  return q;
};

// TODO: used for min/max in date computations
// export const clamp = (v: number, min: number, max: number): number =>
//   Math.min(max, Math.max(min, v));
