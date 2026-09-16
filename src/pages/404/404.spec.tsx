import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import NotFoundPage from './404';

describe('NotFoundPage', () => {
  it('renders the not found message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
