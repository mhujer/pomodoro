/// <reference types="vitest" />
/// <reference types="vite/client" />

// @see https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
    },
});
