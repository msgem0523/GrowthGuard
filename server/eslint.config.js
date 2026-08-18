import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.nodeBuiltin,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
]
