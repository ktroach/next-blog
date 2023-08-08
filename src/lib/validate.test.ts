import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import { useVariableValidator } from './validate'; 

describe('useVariableValidator hook', () => {
  it('should validate variables correctly', () => {
    const { result } = renderHook(() => useVariableValidator());

    const num = 42;
    const str = 'Hello';
    const arr = [1, 2, 3];
    const obj = { name: 'John' };

    act(() => {
      result.current.addVariable(num, 42);
      result.current.addVariable(str, 'Hello');
      result.current.addVariable(arr, [1, 2, 3]);
      result.current.addVariable(obj, { name: 'John' });
    });

    expect(result.current.validate()).toBe(true);
  });

  it('should handle invalid variables correctly', () => {
    const { result } = renderHook(() => useVariableValidator());

    const num = 42;
    const str = 'Hello';
    const arr = [1, 2, 3];
    const obj = { name: 'Jane' }; // Expected name: 'John'

    act(() => {
      result.current.addVariable(num, 42);
      result.current.addVariable(str, 'Hello');
      result.current.addVariable(arr, [1, 2, 3]);
      result.current.addVariable(obj, { name: 'John' });
    });

    expect(result.current.validate()).toBe(false);
  });

  it('should handle nested arrays correctly', () => {
    const { result } = renderHook(() => useVariableValidator());

    const nestedArr = [[1, 2], [3, 4]];
    const expectedNestedArr = [[1, 2], [3, 4]];

    act(() => {
      result.current.addVariable(nestedArr, expectedNestedArr);
    });

    expect(result.current.validate()).toBe(true);
  });

  it('should handle nested objects correctly', () => {
    const { result } = renderHook(() => useVariableValidator());

    const nestedObj = { data: { name: 'Alice' } };
    const expectedNestedObj = { data: { name: 'Alice' } };

    act(() => {
      result.current.addVariable(nestedObj, expectedNestedObj);
    });

    expect(result.current.validate()).toBe(true);
  });
});
