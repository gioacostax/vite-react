/// <reference types="vitest/config" />
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@public': path.resolve(import.meta.dirname, 'public'),
      '@shared': path.resolve(import.meta.dirname, 'shared'),
    },
  },
  test: {
    coverage: {
      exclude: ['src/main.tsx', 'src/**/*.spec.{ts,tsx}', 'src/test-setup.ts'],
      include: ['src/**/*.{ts,tsx}'],
      provider: 'istanbul',
    },
    css: true,
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
