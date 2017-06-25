const { floor, random } = Math;
const faces = ['crown', 'star', '★', '☀︎', '⌘︎', '☞'];

export default function getRandomFace() {
  return faces[floor(random() * faces.length)];
}
