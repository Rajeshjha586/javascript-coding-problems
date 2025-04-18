/**
 * Returns a new array that is the result of concatenating the original array
 * with the provided values or arrays.
 *
 * @param {...*} items - The values or arrays to concatenate to the original array.
 * @return {Array} The concatenated array.
 */

Array.prototype.myConcat = function () {
  let concatenatedArray = [];

  for (let index = 0; index < this.length; index++) {
    concatenatedArray.push(this[index]);
  }

  for (let argIndex = 0; argIndex < arguments.length; argIndex++) {
    let currentValue = arguments[argIndex];

    const shouldSpread =
      (Array.isArray(currentValue) ||
        (typeof currentValue === "object" &&
          currentValue !== null &&
          currentValue[Symbol.isConcatSpreadable])) &&
      typeof currentValue.length === "number";

    if (shouldSpread) {
      for (
        let elementIndex = 0;
        elementIndex < currentValue.length;
        elementIndex++
      ) {
        concatenatedArray.push(currentValue[elementIndex]);
      }
    } else {
      concatenatedArray.push(currentValue);
    }
  }

  return concatenatedArray;
};

// const array1 = ["a", "b", "c"];
// const array2 = ["d", "e", "f"];
// const array3 = array1.myConcat(array2);
// console.log(array3);
// results in ['a', 'b', 'c', 'd', 'e', 'f']

// const letters = ["a", "b", "c"];
// const alphaNumeric = letters.concat(1, [2, 3]);
// console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]

const obj1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const obj2 = { 0: 1, 1: 2, 2: 3, length: 3, [Symbol.isConcatSpreadable]: true };
console.log([0].myConcat(obj1, obj2));
// [ 0, { '0': 1, '1': 2, '2': 3, length: 3 }, 1, 2, 3 ]

// const a = [1, , 3]; // Sparse array with a hole at index 1
// const b = a.concat();
// console.log(b); // [1, empty, 3]
