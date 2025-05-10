/**
 * Adds one or more elements to the end of an array-like object.
 *
 * @param {...any} elements - The elements to add to the end of the array-like object.
 * @returns {number} The new length of the array-like object after the elements have been added.
 */
Array.prototype.customPush = function () {
  if (!this) {
    throw TypeError('"this" is null or undefined');
  }

  let obj = Object(this);
  let length = obj.length >>> 0;

  for (let i = 0; i < arguments.length; i++) {
    obj[length] = arguments[i];
    length++;
  }

  obj.length = length;
  return length;
};

// const animals = ["pigs", "goats", "sheep"];
// const count = animals.customPush("cows");
// console.log(count);
// // Expected output: 4
// console.log(animals);
// // Expected output: Array ["pigs", "goats", "sheep", "cows"]
// animals.customPush("chickens", "cats", "dogs");
// console.log(animals);
// // Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]

// const sports = ["soccer", "baseball"];
// const total = sports.customPush("football", "swimming");

// console.log(sports); // ['soccer', 'baseball', 'football', 'swimming']
// console.log(total); // 4

// const vegetables = ["parsnip", "potato"];
// const moreVegs = ["celery", "beetroot"];

// // Merge the second array into the first one
// vegetables.customPush(...moreVegs);

// console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']

// const arrayLike = {
//   length: 3,
//   unrelated: "foo",
//   2: 4,
// };
// Array.prototype.customPush.call(arrayLike, 1, 2);
// console.log(arrayLike);
// // { '2': 4, '3': 1, '4': 2, length: 5, unrelated: 'foo' }
// const plainObj = {};
// // There's no length property, so the length is 0
// Array.prototype.customPush.call(plainObj, 1, 2);
// console.log(plainObj);
// // { '0': 1, '1': 2, length: 2 }

const obj = {
  length: 0,

  addElem(elem) {
    // obj.length is automatically incremented
    // every time an element is added.
    [].customPush.call(this, elem);
  },
};

// Let's add some empty objects just to illustrate.
obj.addElem({});
obj.addElem({});
console.log(obj.length); // 2
