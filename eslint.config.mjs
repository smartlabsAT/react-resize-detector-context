// Flat config for ESLint 10.
// @eslint-react replaces the legacy eslint-plugin-react (no ESLint 10 support
// at time of writing) and ships both the rules-of-hooks and exhaustive-deps
// rules under its own namespace.

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from '@eslint-react/eslint-plugin';
import storybook from 'eslint-plugin-storybook';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...eslintReact.configs['recommended-typescript'],
  },
  ...storybook.configs['flat/recommended'],
];
