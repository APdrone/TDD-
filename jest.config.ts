import type { Config } from '@jest/types';

// const baseDir = '<rootDir>/src/app/doubles';
const baseDir = '<rootDir>/src/app/server_app';
//src\test\server_app3\Itest.test.ts
// const baseTestDir = '<rootDir>/src/test/doubles';
const baseTestDir = '<rootDir>/src/test/server_app3';
//D:\FrondEnd\Testing\Udemy\unitTesting-Jest\Final\src\test\server_app3\Itest.test.ts

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
};
export default config;
