// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // 1. Базовая настройка
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // 2. Где искать тесты
  testMatch: ['**/*.test.{ts,tsx}'],

  // 3. Алиасы (минимально необходимые)
  moduleNameMapper: {
    // CSS модули (просто заглушка)
    '\\.(css|scss|sass)$': 'identity-obj-proxy',

    // Файлы (картинки, шрифты)
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/test/__mocks__/fileMock.js',

    // 3-5 самых важных алиасов для тестов слайсов
    '^@slice/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@thunks$': '<rootDir>/src/services/thunk',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@api$': '<rootDir>/src/utils/Api',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@store-hooks$': '<rootDir>/src/services/hooks',
    '^@mocks$': '<rootDir>/test/__mocks__',
    '^src/utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  // 4. Настройки после инициализации тестов
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // 5. Игнорировать ненужные папки
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/storybook/'],
};
