import componentHookPlugin from '@component-hook/eslint-plugin';

export default [
  ...componentHookPlugin.configs.basic,
  ...componentHookPlugin.configs.markdown,
  componentHookPlugin.configs.prettier,
  ...componentHookPlugin.configs.sonarjs,
  componentHookPlugin.configs.security,

  {
    files: ['solutions/**'],
    rules: {
      'no-unused-vars': 'off',

      'sonarjs/no-nested-assignment': 'off',
      'security/detect-object-injection': 'off',
    },
  },
];
