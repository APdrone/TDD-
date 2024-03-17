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
});
