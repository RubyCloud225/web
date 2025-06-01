import '@testing-library/jest-dom';

global.alert = jest.fn();

jest.mock('react-helmet', () => ({
  Helmet: () => null,
}));

jest.mock('three', () => {
  class BufferGeometry {
    constructor() {
      this.attributes = {
        position: {
          array: [],
        },
      };
      this.setDrawRange = jest.fn();
    }
    setAttribute() {}
  }

  class BufferAttribute {
    constructor() {}
  }

  class PointsMaterial {
    constructor() {}
  }

  class Points {
    constructor() {}
  }

  class LineBasicMaterial {
    constructor() {}
  }

  class LineSegments {
    constructor() {}
  }

  class Scene {
    constructor() {
      this.add = jest.fn();
    }
  }

  return {
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      domElement: {},
      render: jest.fn(),
    })),
    Scene: class {
      constructor() {
        this.add = jest.fn();
      }
    },
    PerspectiveCamera: class {
      constructor() {
        this.position = { x: 0, y: 0, z: 0 };
      }
    },
    BoxGeometry: jest.fn(),
    MeshBasicMaterial: jest.fn(),
    Mesh: jest.fn(),
    BufferGeometry: BufferGeometry,
    BufferAttribute: BufferAttribute,
    PointsMaterial: PointsMaterial,
    Points: Points,
    LineBasicMaterial: LineBasicMaterial,
    LineSegments: LineSegments,
  };
});

jest.mock('../components/SEO', () => {
  return {
    SEO: () => null,
  };
});

jest.mock('../config', () => {
  return {
    DOMAIN: 'http://localhost',
  };
});
