Array.prototype.customPop = function () {
  if (!this) {
    throw TypeError('"this" is null or undefined');
  }

  let obj = Object(this);
  let length = obj.length >>> 0;

  if (!length || length < 0) {
    obj.length = 0;
    return undefined;
  }

  length--;
  var lastElement = obj[length];
  delete obj[length]; // Needed for non-arrays.
  obj.length = length;
  return lastElement;
};

// const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];
// console.log(plants.customPop());
// // Expected output: "tomato"
// console.log(plants);
// // Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
// plants.customPop();
// console.log(plants);
// // Expected output: Array ["broccoli", "cauliflower", "cabbage"]

// const myFish = ["angel", "clown", "mandarin", "sturgeon"];
// const popped = myFish.customPop();
// console.log(myFish); // ['angel', 'clown', 'mandarin' ]
// console.log(popped); // 'sturgeon'

// const arrayLike = {
//   length: 3,
//   unrelated: "foo",
//   2: 4,
// };
// console.log(Array.prototype.customPop.call(arrayLike));
// // 4
// console.log(arrayLike);
// // { length: 2, unrelated: 'foo' }

// const plainObj = {};
// // There's no length property, so the length is 0
// Array.prototype.customPop.call(plainObj);
// console.log(plainObj);
// { length: 0 }

const collection = {
  length: 0,
  addElements(...elements) {
    // obj.length will be incremented automatically
    // every time an element is added.

    // Returning what push returns; that is
    // the new value of length property.
    return [].push.call(this, ...elements);
  },
  removeElement() {
    // obj.length will be decremented automatically
    // every time an element is removed.

    // Returning what pop returns; that is
    // the removed element.
    return [].customPop.call(this);
  },
};

collection.addElements(10, 20, 30);
console.log(collection.length); // 3
collection.removeElement();
console.log(collection.length); // 2
