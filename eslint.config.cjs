const config = require('eslint-config-next')

module.exports = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'out/**',
      '.vercel/**',
      'pnpm-lock.yaml',
    ],
  },
  ...config,
]
