import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import RootLayout from './root';

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  const router = createMemoryRouter(
    [
      {
        Component: RootLayout,
        children: [
          { element: <p>Home content</p>, index: true },
          { element: <p>Lazy content</p>, path: 'lazy' },
        ],
        path: '/',
      },
    ],
    { initialEntries },
  );

  return render(<RouterProvider router={router} />);
};

describe('RootLayout', () => {
  it('renders the lazy nav link', () => {
    renderWithRouter();

    expect(screen.getByRole('link', { name: 'Lazy' })).toHaveAttribute('href', '/lazy');
  });

  it('renders the outlet content when not loading', () => {
    renderWithRouter();

    expect(screen.getByText('Home content')).toBeInTheDocument();
  });

  it('renders nested route content through the outlet', () => {
    renderWithRouter(['/lazy']);

    expect(screen.getByText('Lazy content')).toBeInTheDocument();
  });
});
