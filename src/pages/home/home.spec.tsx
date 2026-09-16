import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import HomePage from './home';

describe('HomePage', () => {
  it('renders the home text', () => {
    render(<HomePage />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
