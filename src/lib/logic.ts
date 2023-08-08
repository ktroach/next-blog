export const sumNumbers = (a: number, b: number): number => {
    if (typeof(a) !== "number") {
        return NaN;
    }
    if (typeof(b) !== "number") {
        return NaN;
    }    
    return a + b;
};

export const isHydrated = <T>(arr: Array<T | null | undefined>): boolean => {
    if (0 === arr.length) return false;
    return arr.every((item) => item !== null && item !== undefined);
};

// const numbers = [1, 2, 3, 4];
// const mixedValues = [1, 'hello', { key: 'value' }, null, undefined];
// const strings = ['apple', 'banana', 'cherry'];

// console.log(isHydrated(numbers)); // Output: true
// console.log(isHydrated(mixedValues)); // Output: false (due to null and undefined)
// console.log(isHydrated(strings)); // Output: true

// const isLength = (arr: Array<string | null | undefined>): boolean => {
//     return arr.every((item) => item !== null && item !== undefined && item.length > 0);
// };

// const checkLogic = (whatToReturn: any, predicates: Array<string | null | undefined>) => {

// };

// const jsonObjectToArray = <T>(obj: { [key: string]: T }): Array<T> =>
//   Object.values(obj);

// const jsonObjectKeysToArray = (obj: { [key: string]: unknown }): Array<string> =>
//   Object.keys(obj);

// const jsonObject = {
//     key1: 'value1',
//     key2: 'value2',
//     key3: 'value3',
// };

// const jsonArray = jsonObjectToArray(jsonObject);

// console.log(jsonArray); // Output: ['value1', 'value2', 'value3']
  
// const jsonKeysArray = jsonObjectKeysToArray(jsonObject);
  
// console.log(jsonKeysArray); // Output: ['key1', 'key2', 'key3']

// // if key1 === 'value1'  

// const schema: any = [
//     { "var": myvar1, "val": true},
//     { "var": myvar2, "val": false },
// ];

// const var1 = schema[0].var;
// const val1 = schema[0].val;
// if (var1 === val1) schema[0].res = true;



// // if the property with the name exists
// const obj = { foo: "1", bar: "2" };
// console.log("foo" in obj);
// console.log("bar" in obj);
// console.log("baz" in obj);


// import { gt } from 'drizzle-orm';
// import {m} from 'mantra';

// let foo = "1";
// let bar = "2";
// let baz = 5;
// let buz = false;

// m.result.returns(true);
// m.conditions.equals(foo, "1");
// m.conditions.equals(bar, "2");
// m.conditions.equals(baz, 3);
// m.conditions.equals(buz, true);
// const result = m.parse();


// m.schema.returns(true).eq(foo, "1").eq(bar, "2").eq(baz, 3).eq(buz, true);
// const result = m.parse();


// const result = m.equals(foo, "1").equals(bar, "2");


// if (m.equals(foo, "1").equals(bar, "2")) {

// }

// if (m.hydrated(foo).hydrated(bar)) {
    
// }

// if (m.empty(bar)) {

// }

// if (m.in(abc, "abc")) {

// }

// if (m.out(abc, "000")) {

// }

// if (m.isnull(foo)) {

// }

// if (m.isundef(foo)) {

// }

// if (m.notempty([foo, bar, baz])) {

// }

// if (!m.empty([foo, bar, baz])) {
    
// }
  

// type ChainingArrayBuilder<T> = {
//     add: (item: T) => ChainingArrayBuilder<T>;
//     getResult: () => T[];
//   };
  
//   const createChainingArrayBuilder = <T>(initialArray: T[]): ChainingArrayBuilder<T> => {
//     let array: T[] = initialArray;
  
//     const add = (item: T) => {
//       array = [...array, item];
//       return chainable;
//     };
  
//     const getResult = () => array;
  
//     const chainable: ChainingArrayBuilder<T> = {
//       add,
//       getResult,
//     };
  
//     return chainable;
//   };
  
//   // Example usage:
  
//   const resultArray = createChainingArrayBuilder<number>([1, 2, 3])
//     .add(4)
//     .add(5)
//     .add(6)
//     .getResult();
  
//   console.log(resultArray); // Output: [1, 2, 3, 4, 5, 6]
  