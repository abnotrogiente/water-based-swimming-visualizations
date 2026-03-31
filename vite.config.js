import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'path'
import glsl from 'vite-plugin-glsl';

const copies = [
    { src: 'node_modules/three/examples/jsm/libs/ammo.wasm.js', dest: 'jsm/libs/' },
    { src: 'node_modules/three/examples/jsm/libs/ammo.wasm.wasm', dest: 'jsm/libs/' },
    { src: 'node_modules/three/examples/jsm/libs/draco/gltf/draco_decoder.js', dest: 'jsm/libs/draco/gltf' },
    { src: 'node_modules/three/examples/jsm/libs/draco/gltf/draco_decoder.wasm', dest: 'jsm/libs/draco/gltf/' },
    { src: 'node_modules/three/examples/jsm/libs/draco/gltf/draco_encoder.js', dest: 'jsm/libs/draco/gltf/' },
    { src: 'node_modules/three/examples/jsm/libs/draco/gltf/draco_wasm_wrapper.js', dest: 'jsm/libs/draco/gltf/' }
];

copies.push({ src: "swimming/assets/vis-config.json", dest: "swimming/assets" });
copies.push({ src: "swimming/assets/vis-config-demo.json", dest: "swimming/assets" });
copies.push({ src: "swimming/assets/vis-config-demo-2.json", dest: "swimming/assets" });

for (let i = 1; i <= 8; i++) copies.push({ src: "swimming/assets/race-data/" + i + ".csv", dest: "swimming/assets/race-data/" });

export default defineConfig({
    base: "/water-based-swimming-visualizations/",
    clearScreen: false,
    optimizeDeps: {
        esbuildOptions: {
            supported: {
                'top-level-await': true
            }
        }
    },
    esbuild: {
        supported: {
            'top-level-await': true
        }
    },
    build: {
        rollupOptions: {
            input: {
                swimming: resolve(__dirname, 'swimming/index.html')
                // ajoute autant de démos que nécessaire
            }
        },
        sourcemap: true,
        chunkSizeWarningLimit: 1024
    },
    server: {
        open: true,
        allowedHosts: ['.trycloudflare.com']
    },
    plugins: [
        viteStaticCopy({
            targets: copies
        }),
        glsl()
    ]
})

