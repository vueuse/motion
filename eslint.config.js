import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    markdown: false,
    rules: {
      'semi': ['error', 'never'],
      'jsdoc/check-param-names': 'off',
      'jsdoc/check-tag-names': 'off',
    },
  },
  {
    ignores: [
      '*.md',
      '*.css',
      'dist/**/*',
      '.output/**/*',
      '.nuxt/**/*',
      'coverage/',
      'dist/',
      'templates/',
    ],
  },
)
