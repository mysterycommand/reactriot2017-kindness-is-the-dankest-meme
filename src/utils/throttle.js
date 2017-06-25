const { values } = Object;

let funcs = {};
let frameId = -1;

let frameCount = 0;
const flushEvery = 3;

function clear() {
  cancelAnimationFrame(frameId);
  funcs = {};
  frameId = -1;
  frameCount = 0;
}

function flush() {
  // only flush every `flushEvery` frames
  frameCount += 1;
  if (frameCount % flushEvery !== 0) {
    frameId = requestAnimationFrame(flush);
    return;
  }

  // pull out the functions we're going to call
  const fns = values(funcs);

  // bail early if there's nothing to do
  if (fns.length === 0) {
    clear();
    return;
  }

  // call all the scheduled functions
  fns.forEach(fn => fn());

  // done!
  clear();
}

export default function throttle(key, func) {
  funcs[key] = func;

  // a send is already scheduled
  if (frameId !== -1) return;
  frameId = requestAnimationFrame(flush);
}
