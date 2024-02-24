# jest:

jest is js/ts testing framework, developed by facebook

also a assertion library.
advantages:

-we get powerful set of matchers

- all in one solution (test runner, asserting library , matchers)
- typescript support

# jest project setup

to initialise packages:

> npm init -y

to install depdency

> npm i -D typescript jest ts-jest @types/jest ts-node

to set config file for jest

> npx ts-jest config:init

Jest configuration written to "D:\FrondEnd\Testing\Udemy\unitTesting-Jest\jest.config.js".

as we are going to add typescript, we can remove this and add manually "jest.config.ts"

```ts
//jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};
export default config;
```

we will add new folder structure

src > app - for dev code > test - for tests

```ts
//src/app=>util.ts

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}
```

then to test it we can add

```ts
//app/test ==>utils.spec.ts

import { toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  test('should return uppercase', () => {
    const result = toUpperCase('abc');
    expect(result).toBe('ABC');
  });
});
```

we can update the package.json with our test

```json

  "scripts": {
    "test": "jest"
  },

```

when we run test

> npm test

our tests passed but we will pass get warning related to use of exports,

```
ts-jest[config] (WARN) message TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.

```

to resolve it , we will manually create "tsconfig.json" ts configuration:

```ts
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}


```

# structure of an unit test:

Structure of a properly written unit test:
AAA principles:

- arrange
- act
- assert

Setup
Teardown

we wil convert our existing test case to new using this AAA principle:

```ts
//old

import { toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  test('should return uppercase', () => {
    const result = toUpperCase('abc');
    expect(result).toBe('ABC');
  });
});
```

```ts
//sut: system under test
//actual and expected: use for actual and expected values of test
describe('Utils test suite', () => {
  it('should return uppercase of valid string', () => {
    //arrange:
    const sut = toUpperCase;
    const expected = 'ABC';

    //act
    const actual = toUpperCase('abc');

    //assert
    expect(actual).toBe(expected);
  });
});
```

# jest assertion and matchers

matachers are which assist us in comparision, we can hover over them and see the details eg "toBe"

> expect(actual).toBe(expected);

whwn working with primitives types , we use "toBe"
but when woking with objects we use "toEqual()"

```ts
expect(lowerCase).toBe('my-string');
expect(extraInfo).toEqual({});
```

for string length we can use either toBe or toHaveLength

```ts
expect(characters).toBe(9);
expect(characters).toHaveLength(9);
```

we can check for undefine

```ts
expect(extraInfo).not.toBe(undefined);
expect(extraInfo).not.toBeUndefined();
expect(extraInfo).toBeDefined();
expect(extraInfo).toBeTruthy();
```

final code

```ts
it('should return info for valid string', () => {
  // const actual = getStringInfo('My-String');

  const { lowerCase, upperCase, characters, length, extraInfo } = getStringInfo('My-String');

  expect(lowerCase).toBe('my-string');
  expect(extraInfo).toEqual({});

  expect(characters).toBe(9);
  expect(characters).toHaveLength(9);
  expect(characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
  expect(characters).toContain<string>('M');

  expect(extraInfo).not.toBe(undefined);
  expect(extraInfo).not.toBeUndefined();
  expect(extraInfo).toBeDefined();
  expect(extraInfo).toBeTruthy();
});
```

# multiple tests structure

we changed the structure to this

```ts
  describe('getStringInfo for  arg My-String should', () => {
    test('return right length', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toHaveLength(9);
    });
    test('return right lower case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });
    test('return right upper case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.upperCase).toBe('MY-STRING');
    });
    test('return right characters', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
      expect(actual.characters).toContain<string>('M');
      expect(actual.characters).toEqual(expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-']));
    });
    test('return defined extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toBeDefined();
    });

    test('return right extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toEqual({});
    });
  });
});

```

# Parameterised tests

currently this test is testing same string "abc" everytime

```ts
describe('Utils test suite', () => {
  it('should return uppercase of valid string', () => {
    //arrange:
    const sut = toUpperCase;
    const expected = 'ABC';

    //act
    const actual = toUpperCase('abc');

    //assert
    expect(actual).toBe(expected);
  });

```
