module.exports = {
  extends: [
    '@fenghan/eslint-config-ts',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
  rules: {
    'import/no-unresolved': [2, { ignore: ['^@'] }],
    'import/extensions': [2, 'never'],
    'import/no-extraneous-dependencies': 'off',
  },
}
