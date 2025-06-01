import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

jest.mock('three');
import { MemoryRouter } from 'react-router-dom';



describe('HomePage', () => {
  test('renders main heading and buttons', () => {
    render(
    <MemoryRouter>
      <HomePage />
      </MemoryRouter>);
    expect(screen.getByText(/We Build Web Experiences/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Schedule a Call/i })).toBeInTheDocument();
  });
});
