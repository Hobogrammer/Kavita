module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    setupFiles: ["fake-indexeddb/auto"],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!flat)/',
    ],
    testEnvironment: './FixJSDOMEnvironment.ts',
};
