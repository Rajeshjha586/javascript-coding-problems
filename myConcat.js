/**
 * Returns a new array that is the result of concatenating the original array
 * with the provided values or arrays.
 *
 * @param {...*} items - The values or arrays to concatenate to the original array.
 * @return {Array} The concatenated array.
 */

Array.prototype.myConcat = function () {
  let concatenatedArray = [];

  for (let index = 0; index < this.length; index++) {
    concatenatedArray.push(this[index]);
  }

  for (let argIndex = 0; argIndex < arguments.length; argIndex++) {
    let currentValue = arguments[argIndex];

    if (Array.isArray(currentValue)) {
      for (
        let elementIndex = 0;
        elementIndex < currentValue.length;
        elementIndex++
      ) {
        concatenatedArray.push(currentValue[elementIndex]);
      }
    } else {
      concatenatedArray.push(currentValue);
    }
  }

  return concatenatedArray;
};

const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.myConcat(array2);
console.log(array3);
// results in ['a', 'b', 'c', 'd', 'e', 'f']

const letters = ["a", "b", "c"];
const alphaNumeric = letters.concat(1, [2, 3]);
console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]
