module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier',
  ],
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
  },
}
