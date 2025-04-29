/**
 * Polyfill for Array.prototype.customfindlast
 *
 * @param {Function} callbackFn - The findLast() method of Array instances iterates the array in reverse order
 * and returns the value of the first element that satisfies the provided testing function.
 * If no elements satisfy the testing function, undefined is returned.
 *   The function is called with the following arguments:
 *     - element: The current element being processed in the array.
 *     - index: The index of the current element.
 *     - array: The array that `findIndex` was called on.
 *
 * @param {*} [thisArg] - Optional. A value to use as `this` when executing `callbackFn`.
 *
 * @returns {*} - The last (highest-index) element in the array that satisfies the provided testing function.
 *   Otherwise, `undefined` is returned if no matching element is found.
 */

Array.prototype.customFindLast = function (callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  let scope = thisArg || this;

  for (let index = this.length - 1; index >= 0; index--) {
    if (callbackFn.call(scope, this[index], index, this)) {
      return this[index];
    }
  }

  return undefined;
};

// const array1 = [5, 12, 50, 130, 44];
// const found = array1.customFindLast((element) => element > 45);
// console.log(found); // Expected output: 130

// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "fish", quantity: 1 },
//   { name: "cherries", quantity: 5 },
// ];
// // return true inventory stock is low
// function isNotEnough(item) {
//   return item.quantity < 2;
// }
// console.log(inventory.customFindLast(isNotEnough));
// // { name: "fish", quantity: 1 }

// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "fish", quantity: 1 },
//   { name: "cherries", quantity: 5 },
// ];
// const result = inventory.customFindLast(({ quantity }) => quantity < 2);
// console.log(result);
// { name: "fish", quantity: 1 }

// function isPrime(element) {
//   if (element % 2 === 0 || element < 2) {
//     return false;
//   }
//   for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
//     if (element % factor === 0) {
//       return false;
//     }
//   }
//   return true;
// }

// console.log([4, 6, 8, 12].customFindLast(isPrime)); // undefined, not found
// console.log([4, 5, 7, 8, 9, 11, 12].customFindLast(isPrime)); // 11

// const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
// const lastTrough = numbers
//   .filter((num) => num > 0)
//   .customFindLast((num, idx, arr) => {
//     // Without the arr argument, there's no way to easily access the
//     // intermediate array without saving it to a variable.
//     if (idx > 0 && num >= arr[idx - 1]) return false;
//     if (idx < arr.length - 1 && num >= arr[idx + 1]) return false;
//     return true;
//   });
// console.log(lastTrough); // 2

// // Declare array with no elements at indexes 2, 3, and 4
// const array = [0, 1, , , , 5, 6];

// // Shows all indexes, not just those with assigned values
// array.customFindLast((value, index) => {
//   console.log(`Visited index ${index} with value ${value}`);
// });
// // Visited index 6 with value 6
// // Visited index 5 with value 5
// // Visited index 4 with value undefined
// // Visited index 3 with value undefined
// // Visited index 2 with value undefined
// // Visited index 1 with value 1
// // Visited index 0 with value 0

// // Shows all indexes, including deleted
// array.customFindLast((value, index) => {
//   // Delete element 5 on first iteration
//   if (index === 6) {
//     console.log(`Deleting array[5] with value ${array[5]}`);
//     delete array[5];
//   }
//   // Element 5 is still visited even though deleted
//   console.log(`Visited index ${index} with value ${value}`);
// });
// // Deleting array[5] with value 5
// // Visited index 6 with value 6
// // Visited index 5 with value undefined
// // Visited index 4 with value undefined
// // Visited index 3 with value undefined
// // Visited index 2 with value undefined
// // Visited index 1 with value 1
// // Visited index 0 with value 0

const arrayLike = {
  length: 3,
  0: 2,
  1: 7.3,
  2: 4,
  3: 3, // ignored by findLast() since length is 3
};
console.log(
  Array.prototype.customFindLast.call(arrayLike, (x) => Number.isInteger(x))
); // 4
