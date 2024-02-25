# Intermediate testing topics

# FIRST Principles

Principles, not rules, that may be followed when writing tests:
First
Independent
repeatable
Self-validating
thorough

# Jest hooks

we have updated the code to use class, wehave beforeEach, before all and similar for after

```ts
export class StringUtils {
  public toUpperCase(arg: string) {
    return toUpperCase(arg);
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}
```

```js
//beforeEach and AfterEach hooks

describe('StringUtils tests', () => {
  let sut;
  beforeEach(() => {
    sut = new StringUtils();
    console.log('Setup');
  });

  afterEach(() => {
    //clearing mocks
    console.log('Teardown');
  });
  it('should return correct Uppercase', () => {
    const actual = sut.toUpperCase('abc');

    expect(actual).toBe('ABC');
    console.log('Actual Test');
  });
});
```

# Testing for errors

we will add error handling in our code, will throw error if input is undefined or null

```ts
export class StringUtils {
  public toUpperCase(arg: string) {
    if (!arg) {
      throw new Error('Invalid arguments');
    }
    return toUpperCase(arg);
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}
```

there are different way in which we can test this error:

1. we warp the code in different function which throws errors in jest and use throw error for checking error thrown or the text as well

anther funciton "toThrowError" is depcreated and we can use "toThrow()" instead of it

```ts
it.only('should throw error for invalid argument', () => {
  function expectError() {
    const actual = sut.toUpperCase('');
  }

  expect(expectError).toThrow();
  // expect(expectError).toThrowError('Invalid arguments');
  expect(expectError).toThrow('Invalid arguments');
});
```

2nd way is using arror function, direcly mentioning the funciton in the expect

```ts
it('should throw error for invalid argument-arrow', () => {
  expect(() => sut.toUpperCase('')).toThrow('Invalid arguments');
});
```

3rd way is to use try-catch

```ts
it.('should throw error for invalid argument-arrow', () => {
      try {
        sut.toUpperCase('');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err).toHaveProperty('message', 'Invalid arguments');
      }
  });

```

but problem with this 3rd approach ,if the code doesnt throw error then it would not go to catch block and test will still pass so we need to modify it

we can add fail method, it will fail when code reach this line

```ts
it.only('should throw error for invalid argument-arrow', () => {
  try {
    sut.toUpperCase('');
    fail('getStringInfo should throw error for invalid args!');
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
    expect(err).toHaveProperty('message', 'Invalid arguments');
  }
});
```

# Jest aliases and watch mode

.only : to run only the one which is tagged to

.skip: to skip test

.concurrent: to run concurrently with other test

.todo: to make skeleton of the tests, when it is not done or incompelte, it will mark it as todo when ran

> test aliases:

like we can use either test() or it() to write test

similarly
xit ==> .skip
fit ==> .only

> watch mode

to enable watch mode we can add flag --watch

"test": "jest --watch"

now whenever we save , it will start the execution.no need to manually start the test

# VScode debug configuration

we will add "microsoft recipe" for debugging jest code

[text](https://github.com/microsoft/vscode-recipes/tree/main/debugging-jest-tests)

[text](https://github.com/microsoft/vscode-recipes/tree/master/debugging-jest-tests)

click on tab "debug and run" and copy the code in the "launch.json"

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Current File",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["${fileBasenameNoExtension}", "--config", "jest.config.js"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "disableOptimisticBPs": true,
  "windows": {
    "program": "${workspaceFolder}/node_modules/jest/bin/jest"
  }
}
```

# test coverage

we can add below configs in the jest

```ts
// collectCoverage: true,
// collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,

  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
};
export default config;
```

then run jest test, it will provide coverage folder and we can open html file there and also can see the same in the terminal

under the hood, jest uses "Istanbul" library for getting code coverage

we can refer below to ignore certtain sections from coverage(which are trivial or not required)

[text](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md)

like in dev code we can mention it as :

```ts
/* istanbul ignore next */
export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
```

only use it when done with unit testing .
