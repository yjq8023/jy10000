module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [2, 'never', { 'web.js': 'never', json: 'never' }],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'max-len': 'off',
  },
};
