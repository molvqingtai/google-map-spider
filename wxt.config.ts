import path from 'node:path'
import { defineConfig } from 'wxt'
import react from '@vitejs/plugin-react'
import { name } from './package.json'

const isDev = process.env.NODE_ENV === 'development'

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: path.resolve('src'),
  entrypointsDir: path.resolve('src', 'app'),
  imports: false,
  runner: {
    startUrls: ['https://www.example.com/']
  },
  vite: () => ({
    define: {
      __DEV__: isDev,
      __NAME__: JSON.stringify(name)
    },
    plugins: [react()]
  })
})
