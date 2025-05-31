export function createRenderer() {
  return {
    setSize: jest.fn(),
    domElement: document.createElement('div'),
    render: jest.fn(),
  };
}
