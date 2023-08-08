import { useState } from 'react';
import _ from 'lodash';

interface ValidationPair {
  variable: unknown;
  expectedValue: unknown;
}

export const useVariableValidator = () => {
  const [validations, setValidations] = useState<ValidationPair[]>([]);

  const addVariable = (variable: unknown, expectedValue: unknown): void => {
    setValidations((prevValidations) => [...prevValidations, { variable, expectedValue }]);
  };

  const validate = (): boolean => {
    for (const { variable, expectedValue } of validations) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      if (_.isArray(variable)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        if (!_.isArray(expectedValue) || variable.length !== expectedValue.length) {
          console.error('Validation failed: Arrays have different lengths.');
          return false;
        }

        for (let i = 0; i < variable.length; i++) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          if (!_.isEqual(variable[i], expectedValue[i])) {
            console.error(`Validation failed: Array elements at index ${i} are different.`);
            return false;
          }
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        if (!_.isEqual(variable, expectedValue)) {
          console.error('Validation failed: Values are different.');
          return false;
        }
      }
    }

    console.log('Validation passed: All values match the expected ones.');
    return true;
  };

  return { addVariable, validate };
};

// Example usage in a React component:
// const MyComponent = () => {
//   const { addVariable, validate } = useVariableValidator();

//   const num = 42;
//   const str = 'Hello';
//   const arr = [1, 2, 3];
//   const obj = { name: 'John' };

//   addVariable(num, 42);
//   addVariable(str, 'Hello');
//   addVariable(arr, [1, 2, 3]);
//   addVariable(obj, { name: 'John' });

//   const handleValidation = () => {
//     validate();
//   };

//   return (
//     <div>
//       <button onClick={handleValidation}>Validate</button>
//     </div>
//   );
// };
