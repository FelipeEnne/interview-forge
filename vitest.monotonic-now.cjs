const originWall = Date.now();
const originPerf = performance.now();

Date.now = function now() {
  return originWall + (performance.now() - originPerf);
};
