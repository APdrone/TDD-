import { StringUtils, getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  describe('StringUtils tests', () => {
    let sut;
    beforeEach(() => {
      sut = new StringUtils();
      console.log('Setup');
    });

    it.only('should throw error for invalid argument- function', () => {
      function expectError() {
        const actual = sut.toUpperCase('');
      }

      expect(expectError).toThrow();
      // expect(expectError).toThrowError('Invalid arguments');
      expect(expectError).toThrow('Invalid arguments');
    });

    it('should throw error for invalid argument-arrow', () => {
      expect(() => sut.toUpperCase('')).toThrow('Invalid arguments');
    });

    it('should throw error for invalid argument-arrow', () => {
      try {
        sut.toUpperCase('');
        fail('getStringInfo should throw error for invalid args!');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err).toHaveProperty('message', 'Invalid arguments');
      }
    });
  });
});
