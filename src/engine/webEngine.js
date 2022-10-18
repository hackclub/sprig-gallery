import { baseEngine } from './baseEngine.js';
import * as render from './render';

export function init(canvas) {
  const { api, state } = baseEngine();

  canvas.setAttribute('tabindex', '1');

  function _gameloop() {
    const dims = state.dimensions;
    setScreenSize(dims.width * 16, dims.height * 16);
    render.updateUniforms(drawTiles());
  }

  function setLegend(...bitmaps) {
    bitmaps.forEach(([key, value]) => {
      if (key.length !== 1) throw new Error(`Bitmaps must have one character names.`);
    });
    state.legend = bitmaps;

    render.setBitmaps(bitmaps);
  }

  function setScreenSize(w, h) {
    canvas.width = w;
    canvas.height = h;

    const { width, height } = state.dimensions;
    window.idealDimensions = [width, height];
  }

  let tileInputs = {
    w: [],
    s: [],
    a: [],
    d: [],
    i: [],
    j: [],
    k: [],
    l: [],
  };
  let afterInputs = [];

  const VALID_INPUTS = ['w', 'a', 's', 'd', 'i', 'j', 'k', 'l'];
  canvas.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!VALID_INPUTS.includes(key)) return;

    for (const valid_key of VALID_INPUTS) if (key == valid_key) tileInputs[key].forEach((fn) => fn());

    afterInputs.forEach((f) => f());

    state.sprites.forEach((s) => {
      s.dx = 0;
      s.dy = 0;
    });

    e.preventDefault();
  });

  function onInput(type, fn) {
    if (!(type in tileInputs))
      throw new Error(`Unknown input key, "${type}": expected one of ${VALID_INPUTS.join(', ')}`);
    tileInputs[type].push(fn);
  }

  function drawTiles() {
    const { dimensions, legend } = state;
    const { width, height, maxTileDim } = dimensions;

    const grid = api.getGrid();
    if (width == 0 || height == 0) return new ImageData(1, 1);
    const img = new ImageData(width, height);

    for (let i = 0; i < grid.length; i++) {
      const x = i % width;
      const y = Math.floor(i / width);

      const sprites = grid[i];
      const zOrder = legend.map((x) => x[0]);
      sprites.sort((a, b) => zOrder.indexOf(a.type) - zOrder.indexOf(b.type)).reverse();

      for (let i = 0; i < 4; i++) {
        if (!sprites[i]) continue;
        const { type: t } = sprites[i];
        img.data[(y * dimensions.width + x) * 4 + i] = 1 + legend.findIndex((f) => f[0] == t);
      }
    }

    return img;
  }

  function afterInput(fn) {
    afterInputs.push(fn);
  }

  // how to add timed things, like bird flying and ball kicks

  return {
    _gameloop,
    setLegend,
    onInput,
    afterInput,
    setScreenSize,
    getState: () => state,
    setBackground: (type) => render.setBackground(type),
    ...api,
  };
}
