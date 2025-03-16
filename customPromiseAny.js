Promise.myAny = function (promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Argument must be an array"));
  }

  return new Promise((resolve, reject) => {
    if (!promises.length) {
      return reject(
        new AggregateError([], "No Promise in Promise.any was resolved")
      );
    }

    const errorList = [];
    let errorCount = 0;

    promises.forEach((promise, index) =>
      promise.then(
        (value) => resolve(value),
        (error) => {
          errorList[index] = error;
          errorCount += 1;

          if (errorCount === promises.length) {
            reject(new AggregateError(errorList, "All promises are rejected"));
          }
        }
      )
    );
  });
};

// const promise1 = Promise.reject(0);
// const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, "quick"));
// const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

// const promises = [promise1, promise2, promise3];

// Promise.myAny(promises)
//   .then((value) => console.log(value))
//   .catch((err) => console.log(err));

// const failure = new Promise((resolve, reject) => {
//   reject("Always fails");
// });

// Promise.myAny([failure]).catch((err) => {
//   console.log(err);
// });
