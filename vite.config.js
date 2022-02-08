import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// import istanbul from 'vite-plugin-istanbul';

const filename = fileURLToPath( import.meta.url );

const dirname = path.dirname( filename );
// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        // jsxInject: `import React from 'react'`
    },
    plugins: [
        // istanbul({
        //     exclude:   [ 'node_modules', 'test/' ],
        //     extension: [ '.js', '.jsx' ],
        //     include:   'src/*'
        // }),
        reactRefresh(),
        react(),
        VitePWA({
            manifest: {
                icons: [
                    {
                        purpose: 'any maskable',
                        sizes:   '192x192',
                        src:     '/android-chrome-192x192.png',
                        type:    'image/png'
                    },
                    {
                        sizes: '512x512',
                        src:   '/android-chrome-512x512.png',
                        type:  'image/png'
                    }
                ],
                name:        'Vitamin',
                short_name:  'Vitamin',
                theme_color: '#BD34FE'
            },
            workbox: {
                additionalManifestEntries: [
                    { revision: null, url: 'https://rsms.me/inter/inter.css' }
                ],
                cleanupOutdatedCaches: true,
                clientsClaim:          true,
                navigateFallback:      undefined,
                skipWaiting:           true
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve( dirname, './src/' )
        }
    },
    server: {
        port: 3111
    }
});
