module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: true,
    __BROWSER__: true,
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  testURL: 'http://localhost/',
}
