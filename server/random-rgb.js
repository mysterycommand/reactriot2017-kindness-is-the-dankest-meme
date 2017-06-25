const { floor, random } = Math;
const { MAX_SAFE_INTEGER } = Number;

function randomUint(max = MAX_SAFE_INTEGER) {
  return floor(random() * max);
}

module.exports = function randomRgb() {
  const r = randomUint(256);
  const g = randomUint(256);
  const b = randomUint(256);

  return `rgb(${r},${g},${b})`;
};
