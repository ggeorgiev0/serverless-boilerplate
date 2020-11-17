module.exports = {
  rules: {
    'prefer-destructuring': 'warn',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1, 1080, 1920],
        ignoreArrayIndexes: true,
        enforceConst: true,
      },
    ],
  },
  extends: ['airbnb-base', 'prettier'],
};
