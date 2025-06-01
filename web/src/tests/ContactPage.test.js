import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from '../pages/ContactPage';

jest.mock('three');
import { MemoryRouter } from 'react-router-dom';

global.fetch = jest.fn();



describe('ContactPage Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders contact form and submits successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), { target: { value: 'Hello there!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://localhost:5000/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello there!',
          }),
        })
      );
    });
  });

  test('handles failed submission', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), { target: { value: 'Hello there!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  test('handles network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), { target: { value: 'Hello there!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
