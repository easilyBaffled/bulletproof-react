import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';

const filename = fileURLToPath( import.meta.url );

const dirname = path.dirname( filename );
// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        // jsxInject: `import React from 'react'`
    },
    plugins: [ reactRefresh(), react() ],
    resolve: {
        alias: {
            '@': path.resolve( dirname, './src/' )
        }
    }
});
