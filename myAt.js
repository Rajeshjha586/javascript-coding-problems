// Normally, a polyfill would be implemented as part of the prototype of a global object.
/* like this
if (!Array.prototype.at) {
  Array.prototype.at = function(index) {
    // Implementation goes here.
  };
} 
*/

/**
 * Returns the array element at the specified index.
 *
 * @param {number} index - The index of the element to return.
 * @return {*} The element at the specified index, or undefined if the index is out of bounds.
 */
Array.prototype.myAt = function (index) {
  if (index < 0) {
    return this[this.length + index];
  }

  return this[index];
};
