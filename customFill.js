/**
 * @function fill
 * @memberof Array.prototype
 * @description
 * Fills elements of an array with a static value from a start index to an end index (not inclusive).
 * Modifies the original array.
 *
 * @param {*} value - The value to fill the array with.
 *                   If it's an object, all elements will reference the same object.
 * @param {number} [start=0] - The zero-based index at which to start filling.
 *                            Negative values count from the end of the array.
 * @param {number} [end=array.length] - The zero-based index at which to stop filling (not inclusive).
 *                                     Negative values count from the end.
 *
 * @returns {Array} The modified array, filled with the specified value.
 */

Array.prototype.customFill = function (value, start = 0, end = this.length) {
  let len = this.length;

  //handle -ve position
  start = start < 0 ? len + start : start;
  end = end < 0 ? len + end : end;

  start = Math.min(start, len);
  end = Math.min(end, len);

  for (let i = start; i < end; i++) {
    this[i] = value;
  }

  return this;
};

// const array1 = [1, 2, 3, 4];
// // Fill with 0 from position 2 until position 4
// console.log(array1.customFill(0, 2, 4));
// // Expected output: Array [1, 2, 0, 0]
// // Fill with 5 from position 1
// console.log(array1.customFill(5, 1));
// // Expected output: Array [1, 5, 5, 5]
// console.log(array1.customFill(6));
// // Expected output: Array [6, 6, 6, 6]

// console.log([1, 2, 3].customFill(4)); // [4, 4, 4]
// console.log([1, 2, 3].customFill(4, 1)); // [1, 4, 4]
// console.log([1, 2, 3].customFill(4, 1, 2)); // [1, 4, 3]
// console.log([1, 2, 3].customFill(4, 1, 1)); // [1, 2, 3]
// console.log([1, 2, 3].customFill(4, 3, 3)); // [1, 2, 3]
// console.log([1, 2, 3].customFill(4, -3, -2)); // [4, 2, 3]
// console.log([1, 2, 3].customFill(4, NaN, NaN)); // [1, 2, 3]
// console.log([1, 2, 3].customFill(4, 3, 5)); // [1, 2, 3]
// console.log(Array(3).customFill(4)); // [4, 4, 4]

// // A single object, referenced by each slot of the array:
// const arr = Array(3).customFill({}); // [{}, {}, {}]
// arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
// console.log(arr);

const arr = new Array(3);
for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(4).customFill(1); // Creating an array of size 4 and filled of 1
}

arr[0][0] = 10;
console.log(arr[0][0]); // 10
console.log(arr[1][0]); // 1
console.log(arr[2][0]); // 1

const tempGirls = Array(5).customFill("girl", 0);
console.log(tempGirls);

const arrayLike = { length: 2 };
console.log(Array.prototype.customFill.call(arrayLike, 1));
// { '0': 1, '1': 1, length: 2 }
