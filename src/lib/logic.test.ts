// __tests__/sumNumbers.test.ts
import { sumNumbers, isHydrated } from './logic';

describe('sumNumbers', () => {
  it('should return the correct sum of two numbers', () => {
    // Test case 1: Positive numbers
    expect(sumNumbers(2, 3)).toEqual(5);

    // Test case 2: Negative numbers
    expect(sumNumbers(-5, -7)).toEqual(-12);

    // Test case 3: Zero and positive number
    expect(sumNumbers(0, 8)).toEqual(8);

    // Test case 4: Zero and negative number
    expect(sumNumbers(0, -5)).toEqual(-5);
  });

  it('should return NaN for non-numeric inputs', () => {
    // Test case 5: String inputs
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    expect(sumNumbers('2' as any, 3 as any)).toBeNaN();

    // Test case 6: Object inputs
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    expect(sumNumbers({} as any, 5 as any)).toBeNaN();

    // Test case 7: Undefined inputs
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    expect(sumNumbers(undefined as any, 10 as any)).toBeNaN();
  });
});

describe(isHydrated, () => {
    it('should be a hydrated array', () => {
        expect(isHydrated([1, 2, 3])).toBe(true);
    });

    it('should not be a hydrated array', () => {
        expect(isHydrated([])).toBe(false);
    })    
});