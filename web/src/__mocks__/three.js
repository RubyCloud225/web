const WebGLRenderer = jest.fn().mockImplementation(() => ({
  setSize: jest.fn(),
  domElement: {},
  render: jest.fn(),
}));

const Scene = jest.fn().mockImplementation(() => ({
  add: jest.fn(),
}));

const PerspectiveCamera = jest.fn().mockImplementation(() => ({}));

const BoxGeometry = jest.fn();

const MeshBasicMaterial = jest.fn();

const Mesh = jest.fn();

const Points = jest.fn();

const PointsMaterial = jest.fn();

const LineBasicMaterial = jest.fn();

class BufferGeometry {
  constructor() {
    // mock constructor
  }
}

export {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Points,
  PointsMaterial,
  LineBasicMaterial,
  BufferGeometry,
};
