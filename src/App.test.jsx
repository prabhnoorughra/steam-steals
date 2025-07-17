import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App.jsx'

describe('App component', () => {
  it('shows the NavBar logo text "Steam Steals!"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Look for the exact text in the NavBar
    const logoText = screen.getByText(/steam steals!/i);
    expect(logoText).toBeInTheDocument();
  });
});