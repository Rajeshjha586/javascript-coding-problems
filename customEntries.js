// Array.prototype.customEntries = function* () {
//   // A generator function which returns a generator object( basically follows iterator protocol)
//   // Why we use here? because the entries return array iterator
//   // A yield will pause and resume the function (Basically it will return the entries one by one until done becomes true)

//   for (let i = 0; i < this.length; i++) {
//     yield [i, this[i]];
//   }
// };

/**
 * Creates a custom iterator for an array, returning key-value pairs like [index, element],
 * similar to Array.prototype.entries().
 *
 * @this {Array} The array on which the method is called.
 * @returns {Iterator<[number, any]>} An iterator object that returns [index, value] pairs
 *          with each call to `.next()`, and has a [Symbol.iterator]() method to support for...of loops.
 */

Array.prototype.customEntries = function () {
  var index = 0;
  var array = this;

  const iterator = {
    next: function () {
      if (index < array.length) {
        return { value: [index, array[index++]], done: false };
      } else {
        return { done: true };
      }
    },
    [Symbol.iterator]: function () {
      return this;
    },
  };

  return iterator;
};

const array1 = ["a", "b", "c"];

const iterator1 = array1.customEntries();
console.log(iterator1.next().value);
// Expected output: Array [0, "a"]
console.log(iterator1.next().value);
// Expected output: Array [1, "b"]
const a = ["a", "b", "c"];

for (const [index, element] of a.customEntries()) {
  console.log(index, element);
}

const array = ["a", "b", "c"];
const arrayEntries = array.customEntries();

for (const element of arrayEntries) {
  console.log(element);
}
