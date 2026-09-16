import { createBrowserRouter } from 'react-router';

import NotFoundPage from '@/pages/404/404';
import LoaderComponent from '@/shared/components/loader/loader';

import RootLayout from '../layouts/root';
import Home from './home/home';

// Vite exposes the configured `base` as import.meta.env.BASE_URL (with trailing slash).
// React Router expects a basename without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export default createBrowserRouter(
  [
    {
      Component: RootLayout,
      children: [
        {
          Component: Home,
          index: true,
        },
        {
          HydrateFallback: LoaderComponent,
          lazy: async () => ({ Component: (await import('./lazy/lazy')).default }),
          path: 'lazy',
        },
      ],
      ErrorBoundary: NotFoundPage,
      path: '/',
    },
  ],
  { basename },
);
