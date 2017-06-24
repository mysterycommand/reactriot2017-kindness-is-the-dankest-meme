import randomUint from './random-uint';

export default function randomRgb() {
  const r = randomUint(256);
  const g = randomUint(256);
  const b = randomUint(256);

  return `rgb(${r},${g},${b})`;
}
