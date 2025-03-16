Promise.promiseRace = function (promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Argument must be an array"));
  }

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) =>
      promise.then(
        (value) => resolve(value),
        (error) => reject(error)
      )
    );
  });
};

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, "two");
// });
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, "one");
// });

// Promise.promiseRace([promise1, promise2]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// });
// Expected output: "two"

// function sleep(time, value, state) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (state === "fulfill") {
//         return resolve(value);
//       } else {
//         return reject(new Error(value));
//       }
//     }, time);
//   });
// }

// const p1 = sleep(500, "one", "fulfill");
// const p2 = sleep(100, "two", "fulfill");

// Promise.promiseRace([p1, p2]).then((value) => {
//   console.log(value); // "two"
//   // Both fulfill, but p2 is faster
// });

// const p3 = sleep(100, "three", "fulfill");
// const p4 = sleep(500, "four", "reject");

// Promise.promiseRace([p3, p4]).then(
//   (value) => {
//     console.log(value); // "three"
//     // p3 is faster, so it fulfills
//   },
//   (error) => {
//     // Not called
//   }
// );

// const p5 = sleep(500, "five", "fulfill");
// const p6 = sleep(100, "six", "reject");

// Promise.promiseRace([p5, p6]).then(
//   (value) => {
//     // Not called
//   },
//   (error) => {
//     console.error(error.message); // "six"
//     // p6 is faster, so it rejects
//   }
// );
