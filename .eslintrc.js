module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript', 'next'],
  env: {
    node: true,
    browser: true,
  },
  globals: {
    REACT_APP_ENV: true,
  },
  rules: {
    'import/no-anonymous-default-export': 'off',
  },
}
