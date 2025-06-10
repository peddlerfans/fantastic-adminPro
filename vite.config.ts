import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import pkg from './package.json'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // 全局 scss 资源
  const scssResources: string[] = []
  fs.readdirSync('src/assets/styles/resources').forEach((dirname) => {
    if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@use "/src/assets/styles/resources/${dirname}" as *;`)
    }
  })
  return {
    // 开发服务器选项 https://cn.vitejs.dev/config/server-options
    server: {
      open: true,
      host: true,
      port: 9000,
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: true,
          rewrite: path => path.replace(/\/proxy/, ''),
        },
      },
    },
    // 构建选项 https://cn.vitejs.dev/config/build-options
    build: {
      target: 'esnext', // ✅ 必须使用 ESNext 特性
      outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
      // sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      sourcemap: false,
      rollupOptions: {
        output: {
          // ✅ 确保 WASM 文件被打包
          manualChunks(id) {
            if (/node_modules\/@visactor\/vchart/.test(id)) {
              return 'vchart'
            }
          }
        },
      },
      external: ['vue-tsc'] // 防止隐式调用
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          version: pkg.version,
          dependencies: pkg.dependencies,
          devDependencies: pkg.devDependencies,
        },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    },
    plugins: createVitePlugins(mode, command === 'build'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '#': path.resolve(__dirname, 'src/types'),
      },
      extensions: ['.js', '.json', '.ts'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: scssResources.join(''),
        },
      },
    },
    optimizeDeps: {
      exclude: ['@visactor/vchart']
    }
  }
}
)

