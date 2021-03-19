module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['eslint-plugin-import-helpers'],
  root: true,
  rules: {
    'import-helpers/order-imports': [
      'error',
      {
        alphabetize: { ignoreCase: true, order: 'asc' },
        groups: [
          'module',
          '/.vue$/',
          ['parent', 'sibling', 'index'],
        ],
        newlinesBetween: 'always',
      },
    ],
    'no-alert': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/attributes-order': ['error', {
      alphabetical: true,
    }],
    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: true,
    }],
    'vue/order-in-components': ['error'],
    'vue/padding-line-between-blocks': ['error'],
    'vue/sort-keys': ['error'],
  },
};
