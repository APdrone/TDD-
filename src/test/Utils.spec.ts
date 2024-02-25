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

  describe('ToUpperCase examples', () => {
    it.each([
      { input: 'abc', expected: 'ABC' },
      { input: 'my-string', expected: 'MY-STRING' },
      { input: 'def', expected: 'DEF' },
    ])('$input  toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

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
