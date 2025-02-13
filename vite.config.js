import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { presetUno, presetIcons } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [presetIcons(), presetUno()],
      transformers: [transformerDirectives()]
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
  },
});
