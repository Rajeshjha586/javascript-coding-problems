/**
 * Polyfill for Array.prototype.find
 *
 * @param {Function} callbackFn - A function to execute for each element in the array.
 *   It should return a truthy value to indicate a matching element has been found, and a falsy value otherwise.
 *   The function is called with the following arguments:
 *     - element: The current element being processed in the array.
 *     - index: The index of the current element.
 *     - array: The array that `find` was called on.
 *
 * @param {*} [thisArg] - Optional. A value to use as `this` when executing `callbackFn`.
 *
 * @returns {*} - The value of the first element in the array that satisfies the provided testing function.
 *   Otherwise, `undefined` is returned if no matching element is found.
 */

Array.prototype.customFind = function (callbackFn, context) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  const scope = context || this;

  for (let index = 0; index < this.length; index++) {
    if (Object.prototype.hasOwnProperty.call(this, index)) {
      if (callbackFn.call(scope, this[index], index, this)) {
        return this[index];
      }
    }
  }

  return undefined;
};

// const array1 = [5, 12, 8, 130, 44];
// const found = array1.find((element, index, arr) => {
//   return element > 10;
// });
// console.log(found); // Expected output: 12

// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "cherries", quantity: 5 },
// ];

// function isCherries(fruit) {
//   return fruit.name === "cherries";
// }

// console.log(inventory.customFind(isCherries)); // { name: 'cherries', quantity: 5 }

// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "cherries", quantity: 5 },
// ];

// const result = inventory.customFind(({ name }) => name === "cherries");

// console.log(result); // { name: 'cherries', quantity: 5 }

function isPrime(element, index, array) {
  let start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, , , , 6, 8, 12].customFind(isPrime)); // undefined, not found
console.log([4, 5, 8, 12].customFind(isPrime)); // 5

// const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
// const firstTrough = numbers
//   .filter((num) => num > 0)
//   .customFind((num, idx, arr) => {
//     // Without the arr argument, there's no way to easily access the
//     // intermediate array without saving it to a variable.
//     if (idx > 0 && num >= arr[idx - 1]) return false;
//     if (idx < arr.length - 1 && num >= arr[idx + 1]) return false;
//     return true;
//   });
// console.log(firstTrough); // 1

// // Declare array with no elements at indexes 2, 3, and 4
// const array = [0, 1, , , , 5, 6];

// // Shows all indexes, not just those with assigned values
// array.customFind((value, index) => {
//   console.log("Visited index", index, "with value", value);
// });
// // Visited index 0 with value 0
// // Visited index 1 with value 1
// // Visited index 2 with value undefined
// // Visited index 3 with value undefined
// // Visited index 4 with value undefined
// // Visited index 5 with value 5
// // Visited index 6 with value 6

// // Shows all indexes, including deleted
// array.customFind((value, index) => {
//   // Delete element 5 on first iteration
//   if (index === 0) {
//     console.log("Deleting array[5] with value", array[5]);
//     delete array[5];
//   }
//   // Element 5 is still visited even though deleted
//   console.log("Visited index", index, "with value", value);
// });
// // Deleting array[5] with value 5
// // Visited index 0 with value 0
// // Visited index 1 with value 1
// // Visited index 2 with value undefined
// // Visited index 3 with value undefined
// // Visited index 4 with value undefined
// // Visited index 5 with value undefined
// // Visited index 6 with value 6

const arrayLike = {
  length: 3,
  "-1": 0.1, // ignored by find() since -1 < 0
  0: 2,
  1: 7.3,
  2: 4,
};
console.log(
  Array.prototype.customFind.call(arrayLike, (x) => !Number.isInteger(x))
);
// 7.3
