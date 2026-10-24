import { basic, ignorePatterns } from '@component-hook/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [basic],
  env: {
    builtin: true,
    node: true,
  },
  ignorePatterns: [...ignorePatterns, 'docs/solutions/**'],
  overrides: [
    {
      files: ['**/solutions/**'],
      rules: {
        'no-unused-vars': 'off',

        'oxc/bad-bitwise-operator': 'off',

        'unicorn/no-new-array': 'off',
        'unicorn/prefer-code-point': 'off',
        'unicorn/filename-case': 'off',
      },
      globals: {
        PriorityQueue: 'readonly',
        MaxPriorityQueue: 'readonly',
        MinPriorityQueue: 'readonly',
        TreeNode: 'readonly',
        ListNode: 'readonly',
        Heap: 'readonly',
        MaxHeap: 'readonly',
        MinHeap: 'readonly',
      },
    },
  ],
});
