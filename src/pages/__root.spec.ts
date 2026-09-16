import { describe, expect, it } from 'vitest';

import router from './__root';

describe('router configuration', () => {
  it('creates a router with a single root route', () => {
    const root = router.routes[0];

    expect(router.routes).toHaveLength(1);
    expect(root?.path).toBe('/');
  });

  it('defines an index route and a lazy child route', () => {
    const children = router.routes[0]?.children ?? [];

    expect(children).toHaveLength(2);
    expect(children[0]?.index).toBe(true);
    expect(children[1]?.path).toBe('lazy');
  });

  it('configures a lazy loader for the lazy route', () => {
    const lazyRoute = router.routes[0]?.children?.[1];

    expect(lazyRoute?.lazy).toBeTypeOf('function');
  });
});
