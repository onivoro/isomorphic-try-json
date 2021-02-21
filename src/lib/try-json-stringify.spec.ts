import * as faker from 'faker';
import { tryJsonStringify } from './try-json-stringify';

const arbitraryNumber: number = faker.random.number();

describe('tryJsonStringify', () => {
  describe('GIVEN input is stringifiable', () => {
    describe.each([
      [0, '0'],
      ['0', '"0"'],
      [faker.random.number(), expect.stringMatching(/\d/)],
      [faker.random.number().toString(), expect.stringMatching(/\d/)],
      [false, 'false'],
      ['false', '"false"'],
      [true, 'true'],
      ['true', '"true"'],
      ['', '""'],
      [{ test: arbitraryNumber }, expect.stringMatching(new RegExp(`"test".*${arbitraryNumber}`)) ],
      [{ test: arbitraryNumber.toString() },  expect.stringMatching(new RegExp(`"test".*"${arbitraryNumber}"`)) ],
      [faker.random.word(), expect.any(String)],
      [faker.random.words(), expect.any(String)],
    ])('WHEN input is: %j', (input, expectedOutput) => {
      it(`returns ${expectedOutput}`, () => {
        expect(tryJsonStringify(input as any)).toEqual(expectedOutput);
      });
    });
  });

  describe('GIVEN input is not stringifiable', () => {
    let circularObject: any;

    beforeEach(() => {
      circularObject = { children: [] };
      const circularObjectChild = { parent: circularObject };
      circularObject.children.push(circularObjectChild);
    });

    describe('WHEN input is circular', () => {
      it(`returns null`, () => {
        expect(tryJsonStringify(circularObject)).toEqual(null);
      });
    });
  });
});
