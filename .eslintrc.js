module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] // https://github.com/benmosher/eslint-plugin-import/issues/1615
      }
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/test.tsx', '**/test.ts'] },
    ],
    '@typescript-eslint/indent': [2, 2],
    'import/extensions': ['error', 'ignorePackages', { // https://github.com/benmosher/eslint-plugin-import/issues/1615
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    "camelcase": "off",
    "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    // Ollie: I _hate_ default exports, so this one's a personal thing
    'import/prefer-default-export': 0,
  },
};
