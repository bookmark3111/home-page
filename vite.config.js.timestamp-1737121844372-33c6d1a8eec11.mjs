// vite.config.js
import { defineConfig } from "file:///D:/.NET%20Core/Vue/home-vue/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/.NET%20Core/Vue/home-vue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import UnoCSS from "file:///D:/.NET%20Core/Vue/home-vue/node_modules/unocss/dist/vite.mjs";
import { presetUno, presetIcons } from "file:///D:/.NET%20Core/Vue/home-vue/node_modules/unocss/dist/index.mjs";
import { resolve } from "path";
import transformerDirectives from "file:///D:/.NET%20Core/Vue/home-vue/node_modules/@unocss/transformer-directives/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\.NET Core\\Vue\\home-vue";
var vite_config_default = defineConfig({
  plugins: [vue(), UnoCSS({
    presets: [presetIcons(), presetUno()],
    transformers: [transformerDirectives()]
  })],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFwuTkVUIENvcmVcXFxcVnVlXFxcXGhvbWUtdnVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwuTkVUIENvcmVcXFxcVnVlXFxcXGhvbWUtdnVlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8uTkVUJTIwQ29yZS9WdWUvaG9tZS12dWUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnO1xuaW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRJY29ucyB9IGZyb20gJ3Vub2Nzcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgdHJhbnNmb3JtZXJEaXJlY3RpdmVzIGZyb20gJ0B1bm9jc3MvdHJhbnNmb3JtZXItZGlyZWN0aXZlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgVW5vQ1NTKHtcbiAgICBwcmVzZXRzOiBbcHJlc2V0SWNvbnMoKSwgcHJlc2V0VW5vKCldLFxuICAgIHRyYW5zZm9ybWVyczogW3RyYW5zZm9ybWVyRGlyZWN0aXZlcygpXVxuICB9KV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG4gIFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF1USxTQUFTLG9CQUFvQjtBQUNwUyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsV0FBVyxtQkFBbUI7QUFDdkMsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sMkJBQTJCO0FBTGxDLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTztBQUFBLElBQ3RCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO0FBQUEsSUFDcEMsY0FBYyxDQUFDLHNCQUFzQixDQUFDO0FBQUEsRUFDeEMsQ0FBQyxDQUFDO0FBQUEsRUFDRixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
