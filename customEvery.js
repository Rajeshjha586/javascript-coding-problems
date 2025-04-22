/**
 * Polyfill for Array.prototype.every
 *
 * @param {Function} callbackFn - A function to execute for each element in the array.
 *   It should return a truthy value to indicate the element passes the test, and a falsy value otherwise.
 *   The function is called with the following arguments:
 *     - element: The current element being processed in the array.
 *     - index: The index of the current element.
 *     - array: The array that customEvery was called on.
 *
 * @param {*} [thisArg] - Optional. A value to use as `this` when executing `callbackFn`.
 *
 * @returns {boolean} - Returns `true` if all elements pass the test (i.e., `callbackFn` returns a truthy value for all),
 *   otherwise returns `false`. Skips empty slots in sparse arrays.
 */

Array.prototype.customEvery = function (callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (Object.prototype.hasOwnProperty.call(this, i)) {
      if (!callbackFn(this[i], i, this)) {
        return false;
      }
    }
  }

  return true;
};

// const isBelowThreshold = (currentValue) => currentValue < 40;
// const array1 = [1, 30, 39, 29, 10, 13];
// console.log(array1.customEvery(isBelowThreshold));
// Expected output: true

// function isBigEnough(element, index, array) {
//   return element >= 10;
// }
// console.log([12, 5, 8, 130, 44].customEvery(isBigEnough)); // false
// console.log([12, 54, 18, 130, 44].customEvery(isBigEnough)); // true

// const isSubset = (array1, array2) =>
//   array2.customEvery((element) => array1.includes(element));

// console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
// console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])); // false

// const numbers = [-2, 4, -8, 16, -32];
// const isIncreasing = numbers
//   .filter((num) => num > 0)
//   .customEvery((num, idx, arr) => {
//     // Without the arr argument, there's no way to easily access the
//     // intermediate array without saving it to a variable.
//     if (idx === 0) return true;
//     return num > arr[idx - 1];
//   });
// console.log(isIncreasing); // true

console.log([1, , 3].customEvery((x) => x !== undefined)); // true
console.log([2, , 2].customEvery((x) => x === 2)); // true

const arrayLike = {
  length: 3,
  0: "a",
  1: "b",
  2: "c",
  3: 345, // ignored by every() since length is 3
};
console.log(
  Array.prototype.customEvery.call(arrayLike, (x) => typeof x === "string")
); // true
