jest.mock('../../app/doubles/otherUtils', () => ({
  ...jest.requireActual('../../app/doubles/otherUtils'),
  calculateComplexity: () => {
    return 10;
  },
}));

jest.mock('uuid', () => ({
  v4: () => '123',
}));

import * as otherUtils from '../../app/doubles/otherUtils';

describe('module tests', () => {
  it('calculate complexity', () => {
    const result = otherUtils.calculateComplexity({} as any);
    console.log(result);
    expect(result).toBe(10);
  });

  it('keep other functions', () => {
    const result = otherUtils.toUpperCase('abc');
    expect(result).toBe('ABC');
  });
  //test case with call to third party library uuid
  it.only('string with id', () => {
    const result = otherUtils.toLowerCaseWithId('ABC');
    expect(result).toBe('abc123');
  });
});
