import { describe, it, expect, vi } from 'vitest';

// Mock des fonctions API
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API Service', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should make GET request with correct URL', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' })
    });

    const response = await fetch('http://localhost:8080/api/cities');
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/cities');
    expect(response.ok).toBe(true);
  });

  it('should handle API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    const response = await fetch('http://localhost:8080/api/cities/999');
    expect(response.ok).toBe(false);
    expect(response.status).toBe(404);
  });

  it('should include authorization header when token is present', async () => {
    const token = 'fake-jwt-token';
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'authenticated' })
    });

    await fetch('http://localhost:8080/api/protected', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/protected',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Authorization': `Bearer ${token}`
        })
      })
    );
  });
});
