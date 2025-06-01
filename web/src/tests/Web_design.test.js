import React from 'react';
import { render, screen } from '@testing-library/react';
import WebDesignPage from '../pages/Web_design';

jest.mock('three');
import { MemoryRouter } from 'react-router-dom';


describe('WebDesignPage', () => {
  test('renders main heading and buttons', () => {
    render(
    <MemoryRouter>
      <WebDesignPage />
      </MemoryRouter>);
    expect(screen.getByText(/We design cutting edge landing page to suit your brand/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Schedule a Call/i })).toBeInTheDocument();
  });
});
