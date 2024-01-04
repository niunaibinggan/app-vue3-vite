import { resolve } from 'path'

import { loadEnv, UserConfig, ConfigEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

import Pages from 'vite-plugin-pages'

import Layouts from 'vite-plugin-vue-layouts'

import AutoImport from 'unplugin-auto-import/vite'

import Components from 'unplugin-vue-components/vite'

import compressDist, { CompressOptions } from 'rollup-plugin-compress-dist'

import legacy from '@vitejs/plugin-legacy'

import postCssPxToRem from 'postcss-pxtorem'

import eslintPlugin from 'vite-plugin-eslint'

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir)
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_APP_BASE_URL, VITE_APP_SERVER_PROXY, VITE_APP_WEB_PATH, VITE_APP_OUT_DIR } = loadEnv(mode, process.cwd())

  const compressOpts: CompressOptions<'tgz'> = {
    type: 'tgz',
    archiverName: `${VITE_APP_OUT_DIR}.tar.gz`,
    sourceName: VITE_APP_OUT_DIR
  }

  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': pathResolve('src'),
        '@api': pathResolve('src/api'),
        '@router': pathResolve('src/router'),
        '@pages': pathResolve('src/pages')
      }
    },
    plugins: [
      vue({ reactivityTransform: true }),
      Pages({
        pagesDir: [
          { dir: 'src/pages', baseRoute: '' },
          { dir: 'src/pages/public', baseRoute: 'public' },
          { dir: 'src/pages/business', baseRoute: 'business' },
          { dir: 'src/pages/personal', baseRoute: 'personal' }
        ]
      }),
      Layouts({
        layoutsDirs: 'src/layouts',
        defaultLayout: 'index'
      }),
      AutoImport({
        resolvers: [],
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        dts: './auto-import.d.ts'
      }),
      Components({
        resolvers: []
      }),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue']
      }),
      compressDist(compressOpts),
      legacy({
        targets: ['chrome 52'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.filter',
          'es.array.for-each',
          'es.array.flat-map',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all'
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "./src/style/global.scss";'
        }
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    },
    server: {
      open: true,
      host: '0.0.0.0',
      proxy: {
        [VITE_APP_BASE_URL]: {
          target: VITE_APP_SERVER_PROXY,
          changeOrigin: true
        }
      }
    },
    base: VITE_APP_WEB_PATH,
    build: {
      outDir: VITE_APP_OUT_DIR,
      emptyOutDir: true,
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 10000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
}
