import {MathTest} from './MathTest';

jest.mock('../__tests__/a/Analytic.ts');

test('add', () => {
  expect(MathTest(1, 2)).toBeDefined();
});
