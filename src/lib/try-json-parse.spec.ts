import * as faker from 'faker';
import { tryJsonParse } from './try-json-parse';

describe('tryJsonParse', () => {
  describe('GIVEN input is parseable', () => {
    describe.each([
      [0, 0],
      ['0', 0],
      [faker.random.number(), expect.any(Number)],
      [faker.random.number().toString(), expect.any(Number)],
      [false, false],
      ['false', false],
      [true, true],
      ['true', true],
      [`{ "test":  ${faker.random.number()}  }`, expect.objectContaining({ test: expect.any(Number) })],
      [`{ "test": "${faker.random.number()}" }`, expect.objectContaining({ test: expect.stringMatching(/\d/) })],
    ])('WHEN input is: %j', (input, expectedOutput) => {
      it(`returns ${expectedOutput}`, () => {
        expect(tryJsonParse(input as any)).toEqual(expectedOutput);
      });
    });
  });

  describe('GIVEN input is not parseable', () => {
    describe.each([
      ['', null],
      [null, null],
      [undefined, null],
      [NaN, null],
      [faker.random.word(), null],
      [faker.random.words(), null],
    ])('WHEN input is: %j', (input, expectedOutput) => {
      it(`returns ${expectedOutput}`, () => {
        expect(tryJsonParse(input as any)).toEqual(expectedOutput);
      });
    });
  });
});
