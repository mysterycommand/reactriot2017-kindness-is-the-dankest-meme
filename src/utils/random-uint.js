const { floor, random } = Math;
const { MAX_SAFE_INTEGER } = Number;

export default function randomUint(max = MAX_SAFE_INTEGER) {
  return floor(random() * max);
}
