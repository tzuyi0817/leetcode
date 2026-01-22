/** @type {import('lint-staged').Configuration} */

export default {
  '*.{ts,js,md,yml,json}': () => 'pnpm lint',
};
