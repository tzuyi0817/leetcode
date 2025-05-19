/** @type {import('lint-staged').Configuration} */

export default {
  '*.{ts,js,md}': () => 'pnpm lint',
};
