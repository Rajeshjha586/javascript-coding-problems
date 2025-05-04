/**
 * Array.prototype.unshift
 *
 * Adds one or more elements to the beginning of an array-like object
 * and returns the new length of the object.
 *
 * @this {Object} An array or array-like object.
 *
 * @param {...any} elements - One or more elements to add at the start of the object.
 *
 * @returns {number} The new length of the object after inserting the elements.
 *
 */

Array.prototype.customUnshift = function () {
  if (!this) {
    throw TypeError('"this" is null or undefined');
  }

  let obj = Object(this);
  let length = obj.length >>> 0;

  if (!length || length < 0) {
    length = 0;
  }

  for (let index = length - 1; index >= 0; index--) {
    if (index in obj) {
      obj[index + arguments.length] = obj[index];
    } else {
      delete obj[index + arguments.length];
    }
  }

  for (let index = 0; index < arguments.length; index++) {
    obj[index] = arguments[index];
  }

  return (obj.length = length + arguments.length);
};

// const array1 = [1, 2, 3];
// console.log(array1.customUnshift(4, 5));
// // Expected output: 5
// console.log(array1);
// // Expected output: Array [4, 5, 1, 2, 3]

// let arr = [4, 5, 6];
// arr.customUnshift(1, 2, 3);
// console.log(arr);
// // [1, 2, 3, 4, 5, 6]

// arr = [4, 5, 6]; // resetting the array
// arr.customUnshift(1);
// arr.customUnshift(2);
// arr.customUnshift(3);
// console.log(arr);
// // [3, 2, 1, 4, 5, 6]

// const arr = [1, 2];
// arr.customUnshift(0); // result of the call is 3, which is the new array length
// console.log(arr);
// // arr is [0, 1, 2]
// arr.customUnshift(-2, -1); // the new array length is 5
// console.log(arr);
// // arr is [-2, -1, 0, 1, 2]
// arr.customUnshift([-4, -3]); // the new array length is 6
// console.log(arr);
// // arr is [[-4, -3], -2, -1, 0, 1, 2]
// arr.customUnshift([-7, -6], [-5]); // the new array length is 8
// console.log(arr);
// // arr is [ [-7, -6], [-5], [-4, -3], -2, -1, 0, 1, 2 ]

const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
};
Array.prototype.customUnshift.call(arrayLike, 1, 2);
console.log(arrayLike);
// { '0': 1, '1': 2, '4': 4, length: 5, unrelated: 'foo' }

const plainObj = {};
// There's no length property, so the length is 0
Array.prototype.customUnshift.call(plainObj, 1, 2);
console.log(plainObj);
// { '0': 1, '1': 2, length: 2 }
