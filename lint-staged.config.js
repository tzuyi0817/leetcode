/** @type {import('lint-staged').Configuration} */

export default {
  '*.{ts,js,md,yml,json}': 'oxfmt --no-error-on-unmatched-pattern',
  '*.{ts,js}': 'oxlint --fix',
};
