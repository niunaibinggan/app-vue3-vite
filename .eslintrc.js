const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  plugins: ['vue', 'import'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    },
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    './.eslintrc-auto-import.json'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@api', './src/api'],
          ['@router', './src/router'],
          ['@pages', './src/pages']
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  },
  rules: {
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: []
      }
    ],
    'no-unused-vars': 0,
    'vue/no-v-model-argument': 'off',
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }]
  },
  globals: {
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly'
  }
})
