// jest.setup.js
jest.mock('three', () => {
    return {
      WebGLRenderer: jest.fn().mockImplementation(() => ({
        setSize: jest.fn(),
        domElement: {},
        render: jest.fn(),
      })),
      Scene: jest.fn().mockImplementation(() => ({
        add: jest.fn(),
      })),
      PerspectiveCamera: jest.fn().mockImplementation(() => ({})),
      BoxGeometry: jest.fn(),
      MeshBasicMaterial: jest.fn(),
      Mesh: jest.fn(),
    };
  });