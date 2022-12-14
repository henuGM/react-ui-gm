/// <reference types="vitest" />
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from './config/unocss'


// https://vitejs.dev/config/
export const config=({
  plugins: [
    react(),
    Unocss()
  ],
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  },
  build: {
    minify: 'terser', // boolean | 'terser' | 'esbuild'
    sourcemap: true, // 输出单独 source文件
    cssCodeSplit: true,
    lib: {
      entry: "./src/index.ts",
      name: 'react-ui-gm',
      formats: ["esm", "umd","iife"],
      fileName: (format) => `react-ui-gm.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React'
        },
        extend: true,
        assetFileNames:()=> 'style.css'
      }
    },
    outDir: "./dist"
  }
    //   minify:false,
  //   cssCodeSplit: true,   
  //   lib: {
  //     entry: "./src/main.tsx",
  //     name: "SmartyUI",
  //     fileName: "smarty-ui",
  //     // 导出模块格式
  //     formats: ["es", "umd","iife"],
  //   },
  // },
})
export default defineConfig(config as UserConfig);
