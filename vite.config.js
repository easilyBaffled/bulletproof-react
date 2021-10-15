import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import reactJsx from 'vite-react-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        // jsxInject: `import React from 'react'`
    },
    plugins: [reactRefresh(), reactJsx()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
});
