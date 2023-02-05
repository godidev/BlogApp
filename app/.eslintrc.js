module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jest-react/recommended',
    'plugin:cypress/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest-react'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'off'
  }
}
