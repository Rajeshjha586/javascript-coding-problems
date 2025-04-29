/**
 * Polyfill for Array.prototype.findIndex
 *
 * @param {Function} callbackFn - The findIndex() method of Array instances returns the index of the first element in an array
 * that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
 *   The function is called with the following arguments:
 *     - element: The current element being processed in the array.
 *     - index: The index of the current element.
 *     - array: The array that `findIndex` was called on.
 *
 * @param {*} [thisArg] - Optional. A value to use as `this` when executing `callbackFn`.
 *
 * @returns {*} - The value of the first index in the array that satisfies the provided testing function.
 *   Otherwise, `-1` is returned if no matching element is found.
 */

Array.prototype.customFindIndex = function (callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  let scope = thisArg || this;

  for (let index = 0; index < this.length; index++) {
    if (callbackFn.call(scope, this[index], index, this)) {
      return index;
    }
  }

  return -1;
};

// const array1 = [5, 12, 8, 130, 44];
// const isLargeNumber = (element) => element > 13;
// console.log(array1.customFindIndex(isLargeNumber));
// Expected output: 3

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

// console.log([4, 6, 8, 9, 12].customFindIndex(isPrime)); // -1, not found
// console.log([4, 6, 7, 9, 12].customFindIndex(isPrime)); // 2 (array[2] is 7)

// const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
// const firstTrough = numbers
//   .filter((num) => num > 0)
//   .customFindIndex((num, idx, arr) => {
//     // Without the arr argument, there's no way to easily access the
//     // intermediate array without saving it to a variable.
//     if (idx > 0 && num >= arr[idx - 1]) return false;
//     if (idx < arr.length - 1 && num >= arr[idx + 1]) return false;
//     return true;
//   });
// console.log(firstTrough); // 1

// console.log([1, , 3].customFindIndex((x) => x === undefined)); // 1

const arrayLike = {
  length: 3,
  "-1": 0.1, // ignored by findIndex() since -1 < 0
  0: 2,
  1: 7.3,
  2: 4,
};
console.log(
  Array.prototype.findIndex.call(arrayLike, (x) => !Number.isInteger(x))
); // 1
