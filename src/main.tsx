import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router/dom';

import router from './pages/__root';

import './styles/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!, {
  onCaughtError: console.error,
  onRecoverableError: console.error,
  onUncaughtError: console.error,
}).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider onError={console.error} router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
