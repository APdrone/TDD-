import { OtherStringUtils, calculateComplexity, toUpperCaseWithCb } from '../../app/doubles/otherUtils';

describe.skip('OtherUtils test suite', () => {
  describe('Tracking callbacks', () => {
    let cbArgs = [];
    let timesCalled = 0;
    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      //clearing tracking fields
      cbArgs = [];
      timesCalled = 0;
    });

    it('ToUppercase= calls callback for invalid arguments - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined;
      expect(cbArgs).toContain('Invalid arguments');
      expect(timesCalled).toBe(1);
    });

    it('ToUppercase= calls callback for valid arguments', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(cbArgs).toContain('called function with abc');
      expect(timesCalled).toBe(1);
    });
  });

  describe('Tracking callbacks with Jest mocks', () => {
    const callbackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('ToUppercase= calls callback for invalid arguments - track calls', () => {
      const actual = toUpperCaseWithCb('', callbackMock);
      expect(actual).toBeUndefined;
      expect(callbackMock).toHaveBeenCalledWith('Invalid arguments');
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('ToUppercase= calls callback for valid arguments', () => {
      const actual = toUpperCaseWithCb('abc', callbackMock);
      expect(actual).toBe('ABC');
      expect(callbackMock).toHaveBeenCalledWith('called function with abc');
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('OtherStringUtils tests with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test('Use a spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUppercase');

      sut.toUppercase('abc');
      expect(toUpperCaseSpy).toHaveBeenCalledWith('abc');
    });

    test('Use a spy to track calls to other modules', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toHaveBeenCalledWith('abc');
    });
    //to change the method ie not to call third party service for unit tests
    test('Use a spy to replace the implementation of a method', () => {
      jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
        console.log('calling mock implementation!!!');
      });
      sut.callExternalService();
    });
  });

  it('ToUppercase= calls callback for invalid arguments', () => {
    const actual = toUpperCaseWithCb('', () => {});
    expect(actual).toBeUndefined;
  });

  it('ToUppercase= calls callback for valid arguments', () => {
    const actual = toUpperCaseWithCb('abc', () => {});
    expect(actual).toBe('ABC');
  });

  it('Calculates complexity', () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'someInfo',
        field2: 'someotherInfo',
      },
    };
    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
