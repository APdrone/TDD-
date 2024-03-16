# TDD with Jest and TS

# Password checker setup

we added new file for testing and test file

to be tes ==> src\app\pass_checker\PasswordChecker.ts
test file => src\test\pass_checker\PasswordChecker.spec.ts

we updated the jest config file

```ts
import type { Config } from '@jest/types';

//added two variables to hold the test and testing file
const baseDir = '<rootDir>/src/app/pass_checker';
const baseTestDir = '<rootDir>/src/test/pass_checker';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  //use this for coverage
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
};
export default config;
```
