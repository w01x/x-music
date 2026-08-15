module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['react', 'react-hooks', '@typescript-eslint'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
      runtime: 'automatic',
    },
  },

  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
