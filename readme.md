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

# passchecker iteration 1

<!-- requirement is to have password with
- length >8
- should have uppercase letter
- should have lowercase letter
 -->

```ts
// src\app\pass_checker\PasswordChecker.ts
export class PasswordChecker {
  public checkPassword(password: string): boolean {
    if (password.length < 8) return false;
    if (password == password.toLowerCase()) return false;
    if (password == password.toUpperCase()) return false;
    return true;
  }
}
```

```ts
//src\test\pass_checker\PasswordChecker.spec.ts

import { PasswordChecker } from '../../app/pass_checker/PasswordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('password with less than 8 chars is invalid', () => {
    const actual = sut.checkPassword('1234567');
    expect(actual).toBe(false);
  });

  it('password with more than 8 chars is ok', () => {
    const actual = sut.checkPassword('12345678Aa');
    expect(actual).toBe(true);
  });

  it('password with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('1234abcd');
    expect(actual).toBe(false);
  });

  it('password with no upper case letter is valid', () => {
    const actual = sut.checkPassword('1234abcdA');
    expect(actual).toBe(true);
  });

  it('password with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('1234ABCD');
    expect(actual).toBe(false);
  });

  it('password with no lower case letter is valid', () => {
    const actual = sut.checkPassword('1234ABCDa');
    expect(actual).toBe(true);
  });
});
```

# passchecker iteration 2

<!-- requirement is to have mention the reason of failures as well-->

updated the logic

```ts
export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required',
  NO_LOWER_CASE = 'lower case letter required',
}

export interface CheckResult {
  valid: Boolean;
  reasons: string[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
    return {
      valid: reasons.length > 0 ? false : true,
      reasons,
    };
  }
}
```

tests:

```ts
import { PasswordChecker, PasswordErrors } from '../../app/pass_checker/PasswordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('password with less than 8 chars is invalid', () => {
    const actual = sut.checkPassword('1234567');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it('password with more than 8 chars is ok', () => {
    const actual = sut.checkPassword('12345678Aa');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it('password with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('1234abcd');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('password with upper case letter is valid', () => {
    const actual = sut.checkPassword('1234abcdA');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('password with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('1234ABCD');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('password with lower case letter is valid', () => {
    const actual = sut.checkPassword('1234ABCDa');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('complex password is valid', () => {
    const actual = sut.checkPassword('1234ABCDa');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });
});
```

# passCheck iteration 3:

<!-- requirement is to
- refactor
- admin password should also contain a number
 -->

for refactoring, we create separate methods for each functionality

```ts
export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required',
  NO_LOWER_CASE = 'lower case letter required',
}

export interface CheckResult {
  valid: Boolean;
  reasons: string[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    this.checkForLength(password, reasons);
    this.checkForUppercase(password, reasons);
    this.checkForLowerCase(password, reasons);
    return {
      valid: reasons.length > 0 ? false : true,
      reasons,
    };
  }

  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkForUppercase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }
}
```

now for 2nd requirement , admin should have number in password, addmin separate public method for checking admin password and private method for logic

```ts
export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required',
  NO_LOWER_CASE = 'lower case letter required',
  NO_NUMBER = 'At least one number is required',
}

export interface CheckResult {
  valid: Boolean;
  reasons: string[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    this.checkForLength(password, reasons);
    this.checkForUppercase(password, reasons);
    this.checkForLowerCase(password, reasons);
    return {
      valid: reasons.length > 0 ? false : true,
      reasons,
    };
  }
  // adding this
  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password);
    this.checkforNumber(password, basicCheck.reasons as PasswordErrors[]);
    return {
      valid: basicCheck.reasons.length > 0 ? false : true,
      reasons: basicCheck.reasons,
    };
  }
  // adding this
  private checkforNumber(password: string, reasons: PasswordErrors[]) {
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }

  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkForUppercase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }
}
```

```ts
// added two additional tests

it('Admin password with no number is invalid', () => {
  const actual = sut.checkAdminPassword('abcdABCD');
  expect(actual.valid).toBe(false);
  expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
});

it('Admin password with number is valid ', () => {
  const actual = sut.checkAdminPassword('1234ABCDa');
  expect(actual.valid).toBe(true);
  expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
});
```
