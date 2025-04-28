/**
 * Polyfill for Array.prototype.filter
 *
 * @param {Function} callbackFn - A function to execute for each element in the array.
 *   It should return a truthy value to keep the element in the resulting array, and a falsy value otherwise.
 *   The function is called with the following arguments:
 *     - element: The current element being processed in the array.
 *     - index: The index of the current element.
 *     - array: The array that `filter` was called on.
 *
 * @param {*} [thisArg] - Optional. A value to use as `this` when executing `callbackFn`.
 *
 * @returns {Array} - A new array containing only the elements that pass the test.
 *   If no elements pass the test, an empty array is returned.
 */

Array.prototype.customFilter = function (callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new TypeError(callbackFn + " is not a function");
  }

  let temp = [];

  for (let i = 0; i < this.length; i++) {
    if (Object.prototype.hasOwnProperty.call(this, i)) {
      if (callbackFn(this[i], i, this)) {
        temp.push(this[i]);
      }
    }
  }

  return temp;
};

// const nums = [1, 2, 3, 4];
// const moreThanOne = nums.customFilter((num) => {
//   return num > 1;
// });

// console.log(moreThanOne);

// const lessThanTwo = nums.customFilter((num) => {
//   return num <= 2;
// });

// console.log(lessThanTwo);

// const words = ["spray", "elite", "exuberant", "destruction", "present"];

// const result = words.customFilter((word) => word.length > 6);

// console.log(result);
// // Expected output: Array ["exuberant", "destruction", "present"]

// function isBigEnough(value) {
//   return value >= 10;
// }

// const filtered = [12, 5, 8, 130, 44].customFilter(isBigEnough);
// // filtered is [12, 130, 44]
// console.log(filtered);

// const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// function isPrime(num) {
//   for (let i = 2; num > i; i++) {
//     if (num % i === 0) {
//       return false;
//     }
//   }
//   return num > 1;
// }

// console.log(array.customFilter(isPrime)); // [2, 3, 5, 7, 11, 13]

// const arr = [
//   { id: 15 },
//   { id: -1 },
//   { id: 0 },
//   { id: 3 },
//   { id: 12.2 },
//   {},
//   { id: null },
//   { id: NaN },
//   { id: "undefined" },
// ];

// let invalidEntries = 0;

// function filterByID(item) {
//   if (Number.isFinite(item.id) && item.id !== 0) {
//     return true;
//   }
//   invalidEntries++;
//   return false;
// }

// const arrByID = arr.customFilter(filterByID);

// console.log("Filtered Array\n", arrByID);
// // Filtered Array :- [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]
// console.log("Number of Invalid Entries =", invalidEntries);
// // Number of Invalid Entries = 5

// const fruits = ["apple", "banana", "grapes", "mango", "orange"];

// /**
//  * Filter array items based on search criteria (query)
//  */
// function filterItems(arr, query) {
//   return arr.customFilter((el) =>
//     el.toLowerCase().includes(query.toLowerCase())
//   );
// }

// console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
// console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']

// const names = ["JC63", "Bob132", "Ursula89", "Ben96"];
// const greatIDs = names
//   .map((name) => parseInt(name.match(/[0-9]+/)[0], 10))
//   .customFilter((id, idx, arr) => {
//     // Without the arr argument, there's no way to easily access the
//     // intermediate array without saving it to a variable.
//     if (idx > 0 && id <= arr[idx - 1]) return false;
//     if (idx < arr.length - 1 && id <= arr[idx + 1]) return false;
//     return true;
//   });
// console.log(greatIDs); // [132, 96]

// console.log([1, , undefined].customFilter((x) => x === undefined)); // [undefined]
// console.log([1, , undefined].customFilter((x) => x !== 2)); // [1, undefined]

const arrayLike = {
  length: 3,
  0: "a",
  1: "b",
  2: "c",
  3: "a", // ignored by filter() since length is 3
};
console.log(Array.prototype.customFilter.call(arrayLike, (x) => x <= "b"));
// [ 'a', 'b' ]
