import { describe, expect, it } from 'vitest';

import { render } from '@testing-library/react';

import LoaderComponent from './loader';

describe('LoaderComponent', () => {
  it('renders three animated bars', () => {
    const { container } = render(<LoaderComponent />);

    const bars = container.querySelectorAll('span.animate-scale-up');

    expect(bars).toHaveLength(3);
  });

  it('wraps the bars in a flex container', () => {
    const { container } = render(<LoaderComponent />);

    expect(container.firstChild).toHaveClass('flex', 'items-center');
  });
});
