import { StringUtils, getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
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
