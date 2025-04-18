/**
 * Non-mutating version of copyWithin.
 * Returns a new array with values copied to the target index.
 *
 * @param {number} target - Index to copy the values to.
 * @param {number} start - Start index to copy from.
 * @param {number} end - End index (exclusive).
 * @returns {Array} A new array with copied values.
 */

Array.prototype.myCopyWithin = function (
  target = 0,
  start = 0,
  end = this.length
) {
  let len = this.length;

  //handle -ve positions
  target = target < 0 ? len + target : target;
  start = start < 0 ? len + start : start;
  end = end < 0 ? len + end : end;

  target = Math.min(target, len);
  start = Math.min(start, len);
  end = Math.min(end, len);

  let copyOfThis = [];
  for (let i = 0; i < this.length; i++) {
    copyOfThis.push(this[i]);
  }

  for (let i = start; i < end && target < this.length; i++) {
    this[target] = copyOfThis[i];
    target++;
  }

  return this;
};

console.log([1, 2, 3, 4, 5].myCopyWithin(2));

const array1 = ["a", "b", "c", "d", "e"];
// Copy to index 0 the element at index 3
console.log(array1.myCopyWithin(0, 3, 4));
// Expected output: Array ["d", "b", "c", "d", "e"]

// Copy to index 1 all elements from index 3 to the end
console.log(array1.myCopyWithin(1, 3));
// Expected output: Array ["d", "d", "e", "d", "e"]

console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
// [4, 5, 3, 4, 5]
console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4));
// [4, 2, 3, 4, 5]
console.log([1, 2, 3, 4, 5].copyWithin(-2, -3, -1));
// [1, 2, 3, 3, 4]

console.log([1, , 3].copyWithin(2, 1, 2)); // [1, empty, empty]

const arrayLike = {
  length: 5,
  3: 1,
};
console.log(Array.prototype.copyWithin.call(arrayLike, 0, 3));
// { '0': 1, '3': 1, length: 5 }
console.log(Array.prototype.copyWithin.call(arrayLike, 3, 1));
// { '0': 1, length: 5 }
// The '3' property is deleted because the copied source is an empty slot
