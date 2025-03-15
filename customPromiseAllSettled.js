Promise.myAllSettled = function (promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Argument must be an array"));
  }

  const pendingPromises = promises.map((value) =>
    value instanceof Promise ? value : Promise.resolve(value)
  );

  if (!pendingPromises.length) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    let result = new Array(pendingPromises.length);
    let unSettledPromiseCount = pendingPromises.length;

    pendingPromises.forEach((promise, index) => {
      promise.then(
        (value) => {
          result[index] = {
            status: "fulfilled",
            value,
          };

          unSettledPromiseCount--;

          //resolve after all promise are settled
          if (unSettledPromiseCount === 0) {
            resolve(result);
          }
        },
        (reason) => {
          result[index] = {
            status: "rejected",
            reason: reason.message || reason,
          };

          unSettledPromiseCount--;

          //resolve after all promise are settled
          if (unSettledPromiseCount === 0) {
            resolve(result);
          }
        }
      );
    });
  });
};

// const promise1 = Promise.resolve(3);
// const promise2 = new Promise((resolve, reject) =>
//   setTimeout(reject, 100, "foo")
// );
// const promises = [promise1, promise2];

// Promise.myAllSettled(promises).then((results) =>
//   results.forEach((result) => console.log(result.status))
// );

// Promise.myAllSettled([
//   Promise.resolve(33),
//   new Promise((resolve) => setTimeout(() => resolve(66), 0)),
//   99,
//   Promise.reject(new Error("an error")),
// ]).then((values) => console.log(values));
