import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default [
  {
    files: ['frontend/src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    settings: { react: { version: 'detect' } },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest'
      },
      globals: { ...globals.browser }
    },
    plugins: {
      react: reactPlugin,
      'react-compiler': reactCompiler,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'unused-imports': unusedImportsPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          reservedFirst: true,
          shorthandFirst: true,
          noSortAlphabetically: true
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_.*?$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_.*?$',
          destructuredArrayIgnorePattern: '^_.*?$',
          varsIgnorePattern: '^_.*?$',
          ignoreRestSiblings: false
        }
      ],
      'prettier/prettier': 'warn'
    }
  },
  prettierConfig
]
