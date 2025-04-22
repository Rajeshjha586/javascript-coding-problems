//This polyfill checks if the Symbol.iterator property is a function.
// If it's not, it defines the GeneratorFunction constructor, which is the constructor of a generator function,
// and sets its Symbol.iterator property to a function that returns an object with a next method.
// This next method simply returns an object with value set to undefined and done set to true,
// which is the expected behavior for an iterator that has completed.

(function () {
  // Check if Symbol.iterator exists — older environments may not support it
  if (typeof Symbol.iterator !== "function") {
    // Create a generator function (function*), then access its constructor
    // This constructor is called GeneratorFunction — the internal constructor
    // JavaScript uses under the hood to create all generator functions
    let GeneratorFunction = function* () {}.constructor;

    // Add a dummy [Symbol.iterator] method to generator functions
    // So if Symbol.iterator is missing, generator functions still "look" iterable
    GeneratorFunction.prototype[Symbol.iterator] = function () {
      return {
        // This dummy iterator always returns done: true immediately
        next: function () {
          return { value: void 0, done: true };
        },
      };
    };
  }
})();
