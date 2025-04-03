Array.prototype.find = function (callback, context) {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const scope = context || this;

  for (let index = 0; index < this.length; index++) {
    try {
      if (callback.call(scope, this[index], index, this)) {
        return this[index];
      }
    } catch (error) {
      console.error("Error in callback function:", error);
      return undefined;
    }
  }

  return undefined;
};

const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element, index, arr) => {
  return element > 10;
});

console.log(found);
