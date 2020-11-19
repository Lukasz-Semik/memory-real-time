const path = require('path');

module.exports = {
  extends: ['react-app'],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        ignoreRestSiblings: true,
      },
    ],
    'simple-import-sort/sort': [
      1,
      {
        groups: [
          ['^\\u0000'],
          ['^react', '^@?\\w'],
          [
            '^(src/store)(/.*|$)',
            '^(src/helpers)(/.*|$)',
            '^(src/hooks)(/.*|$)',
            '^(src/constants)(/.*|$)',
            '^(src/components)(/.*|$)',
            '^[^.]',
          ],
          ['^\\.'],
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
  },
};
