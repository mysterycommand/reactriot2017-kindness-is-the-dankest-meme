const { abs, sqrt } = Math;

export default function distance(x0, y0, x1, y1) {
  return abs(sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)));
}
