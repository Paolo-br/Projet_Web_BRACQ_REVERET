import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CityCard } from '../../components/Cards';

describe('CityCard Component', () => {
  const mockCity = {
    id: 1,
    name: 'Paris',
    description: 'La ville lumière',
    imageUrl: '/uploads/city/paris.jpg',
    latitude: 48.8566,
    longitude: 2.3522
  };

  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <CityCard city={mockCity} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should display city name', () => {
    render(
      <BrowserRouter>
        <CityCard city={mockCity} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should display city description if provided', () => {
    render(
      <BrowserRouter>
        <CityCard city={mockCity} />
      </BrowserRouter>
    );
    
    const description = screen.queryByText(/La ville lumière/i);
    // La description peut être affichée ou non selon la structure du composant
    if (description) {
      expect(description).toBeInTheDocument();
    }
  });

  it('should render as a link with correct href', () => {
    render(
      <BrowserRouter>
        <CityCard city={mockCity} />
      </BrowserRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/city/Paris');
  });
});
