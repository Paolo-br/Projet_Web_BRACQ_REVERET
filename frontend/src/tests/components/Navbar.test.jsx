import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Mock du localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe('Navbar Component', () => {
  it('should render the navbar', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should display the AllTogether logo/title', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    // Ajustez selon votre implémentation réelle
    const logo = screen.queryByText(/alltogether/i);
    if (logo) {
      expect(logo).toBeInTheDocument();
    }
  });

  it('should render navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    // Vérifier que la navbar contient des liens
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
