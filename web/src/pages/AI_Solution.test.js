import React from 'react';
import { render, screen } from '@testing-library/react';
import AISolutionPage from './AI_Solution';

jest.mock('three');
import { MemoryRouter } from 'react-router-dom';

describe('AISolutionPage', () => {
  test('renders main heading and buttons', () => {
    render(
      <MemoryRouter>
        <AISolutionPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/We build AI Solutions that transform your business/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Schedule a Call/i })).toBeInTheDocument();
  });
});
