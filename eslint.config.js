import componentHookPlugin from '@component-hook/eslint-plugin';

export default [
  ...componentHookPlugin.configs.basic,
  ...componentHookPlugin.configs.markdown,
  componentHookPlugin.configs.prettier,
  ...componentHookPlugin.configs.sonarjs,
  componentHookPlugin.configs.security,

  {
    files: ['**/docs/.vitepress/config/**'],
    rules: {
      'security/detect-non-literal-fs-filename': 'off',

      'sonarjs/no-os-command-from-path': 'off',
    },
  },

  {
    files: ['**/solutions/**'],
    rules: {
      'no-unused-vars': 'off',

      'security/detect-object-injection': 'off',

      'sonarjs/no-nested-assignment': 'off',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/pseudo-random': 'off',
      'sonarjs/no-redundant-assignments': 'off',
      'sonarjs/bitwise-operators': 'off',

      'unicorn/no-new-array': 'off',
      'unicorn/prefer-code-point': 'off',
    },
    languageOptions: {
      globals: {
        PriorityQueue: 'readonly',
        MaxPriorityQueue: 'readonly',
        MinPriorityQueue: 'readonly',
        TreeNode: 'readonly',
        ListNode: 'readonly',
      },
    },
  },

  {
    ignores: ['docs/solutions/**'],
  },
];
