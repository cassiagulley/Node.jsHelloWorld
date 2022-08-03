import { findCatName } from '../src/store';

describe('Store Test', () => {
  test('Finding a cat by id', () => {
    // arrange and act
    const result = findCatName(1);
    // assert
    expect(result).toBe('fry');
  });

  test('undefined cat id', () => {
    // arrange and act
    const result = findCatName(100);
    // assert
    expect(result).toBe(undefined);
  });
});
