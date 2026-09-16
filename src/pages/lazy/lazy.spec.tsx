import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import LazyPage from './lazy';

describe('LazyPage', () => {
  it('renders the lazy content text', () => {
    render(<LazyPage />);

    expect(screen.getByText('Lazy content')).toBeInTheDocument();
  });
});
