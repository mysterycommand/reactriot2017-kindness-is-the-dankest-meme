const { floor, random } = Math;
const faces = ['crown', 'star', '★', '☀︎', '⌘︎', '☞'];

module.exports = function getRandomFace() {
  return faces[floor(random() * faces.length)];
};
