/**
 * Custom implementation of Array.prototype.shift.
 *
 * Removes the first element from an array-like object and shifts all remaining elements one position to the left.
 *
 * @this {Array | Object} - Must be an array or array-like object with numeric keys and a `length` property.
 * @returns {*} The first element of the array-like object, or `undefined` if it's empty.
 * @throws {TypeError} If `this` is null or undefined.
 */

Array.prototype.customShift = function () {
  if (!this) {
    throw TypeError('"this" is null or undefined');
  }

  let obj = Object(this);
  let length = obj.length >>> 0;

  if (!length || length < 0) {
    obj.length = 0;
    return undefined;
  }

  let firstElementOfArr = obj[0];

  for (let index = 0; index < length - 1; index++) {
    if (index + 1 in obj) {
      this[index] = this[index + 1];
    } else {
      delete obj[index];
    }
  }

  delete obj[length - 1];
  obj.length = length - 1;
  return firstElementOfArr;
};

// const array1 = [1, 2, 3];
// const firstElement = array1.customShift();
// console.log(array1);
// // Expected output: Array [2, 3]
// console.log(firstElement);
// // Expected output: 1

// const myFish = ["angel", "clown", "mandarin", "surgeon"];
// console.log("myFish before:", myFish);
// // myFish before: ['angel', 'clown', 'mandarin', 'surgeon']
// const shifted = myFish.customShift();
// console.log("myFish after:", myFish);
// // myFish after: ['clown', 'mandarin', 'surgeon']
// console.log("Removed this element:", shifted);
// // Removed this element: angel

// const names = ["Andrew", "Tyrone", "Paul", "Maria", "Gayatri"];

// while (typeof (i = names.customShift()) !== "undefined") {
//   console.log(i);
// }
// // Andrew, Tyrone, Paul, Maria, Gayatri

// const arrayLike = {
//   length: 3,
//   unrelated: "foo",
//   2: 4,
// };
// console.log(Array.prototype.customShift.call(arrayLike));
// // undefined, because it is an empty slot
// console.log(arrayLike);
// // { '1': 4, length: 2, unrelated: 'foo' }

// const plainObj = {};
// // There's no length property, so the length is 0
// Array.prototype.customShift.call(plainObj);
// console.log(plainObj);
// // { length: 0 }
