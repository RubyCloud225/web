import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('three');

test('renders main heading and buttons', () => {
  render(<App />);
  const heading = screen.getByText(/We Build Web Experiences/i);
  expect(heading).toBeInTheDocument();
  const portfolioButton = screen.getByRole('button', { name: /View Portfolio/i });
  expect(portfolioButton).toBeInTheDocument();
  const scheduleButton = screen.getByRole('button', { name: /Schedule a Call/i });
  expect(scheduleButton).toBeInTheDocument();
});
