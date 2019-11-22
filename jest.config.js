module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      pathRegex: /\.(test)\.ts$/,
    },
  },
  notify: false,
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  resetModules: true,
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'node',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/built/'
  ],
};