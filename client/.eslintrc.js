module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/interface-name-prefix': ['warn', 'always'],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'indent': ['warn', 'tab'],
    'no-duplicate-imports': ['error', { 'includeExports': true }],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-empty-interface': ['warn'],
    'no-magic-numbers': ['warn', { "ignore": [0, 1, 2] }],
  }
}
