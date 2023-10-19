import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
};

export default config;
