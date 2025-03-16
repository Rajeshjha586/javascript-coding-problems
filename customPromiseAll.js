Promise.promiseAll = function (promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError("Argument must be an array"));
  }

  const pendingPromises = promises.map((value) =>
    value instanceof Promise ? value : Promise.resolve(value)
  );

  if (!pendingPromises.length) {
    return Promise.resolve(pendingPromises);
  }

  return new Promise((resolve, reject) => {
    const results = new Array(pendingPromises.length);
    let pendingCount = 0;

    pendingPromises.forEach((promise, index) => {
      promise.then(
        (value) => {
          results[index] = value;
          pendingCount++;
          if (pendingCount === pendingPromises.length) {
            resolve(results);
          }
        },
        (error) => reject(error)
      );
    });
  });
};

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, "foo");
// });

// Promise.promiseAll([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });

// const p1 = Promise.resolve(3);
// const p2 = 1337;
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("foo");
//   }, 100);
// });

// Promise.promiseAll([p1, p2, p3]).then((values) => {
//   console.log(values); // [3, 1337, "foo"]
// });

// console.log("----------------------------------------------------------------");
// const p4 = Promise.promiseAll([1, 2, 3]);
// const p5 = Promise.promiseAll([1, 2, 3, Promise.resolve(444)]);
// const p6 = Promise.promiseAll([1, 2, 3, Promise.reject(555)]);
// setTimeout(() => {
//   console.log(p4);
//   console.log(p5);
//   console.log(p6);
// });

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[3] }
// Promise { <state>: "fulfilled", <value>: Array[4] }
// Promise { <state>: "rejected", <reason>: 555 }

// const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];
// const p = Promise.promiseAll(resolvedPromisesArray);
// console.log(p);
// setTimeout(() => {
//   console.log("the queue is now empty");
//   console.log(p);
// });

// Logs, in order:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }

// const mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
// const p = Promise.promiseAll(mixedPromisesArray);
// console.log(p);
// setTimeout(() => {
//   console.log("the queue is now empty");
//   console.log(p);
// });

// Logs:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "rejected", <reason>: 44 }

// const p = Promise.promiseAll([]);
// const p2 = Promise.promiseAll([1337, "hi"]);
// console.log(p);
// console.log(p2);
// setTimeout(() => {
//   console.log("the queue is now empty");
//   console.log(p2);
// });

// Logs:
// Promise { <state>: "fulfilled", <value>: Array[0] }
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }
