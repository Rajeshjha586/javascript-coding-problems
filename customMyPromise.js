// new Promise((resolve, reject))
// new Promise((resolve, reject)).then(data => console.log(data)).then(data => console.log(data))
// new Promise((resolve, reject)).catch(err => console.log(err)).then(err => console.log(err))
// Promise.resolve(data);
// Promise.reject(error);
// new Promise((resolve, reject)).then(data => return new Promise()).then(data => console.log(data))

// #status: Pending | fulfilled | rejected
// DataStructure to maintain the chain of #handlers:- #handlers<Array> = [handler, handler]

const PROMISE_STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #status;
  #result;
  #isResolveOrRejectCalled;
  #handlers;

  constructor(executor) {
    this.#status = PROMISE_STATUS.PENDING; //maintain the #status
    this.#handlers = []; //maintain instance variables of handle
    this.#isResolveOrRejectCalled = false;
    this.#result = undefined;

    //The resolve and reject when they called as part of executor have the appropraite context.
    // Which is current context of promise being passed to it.
    //Call the executor by passing it the resolve and reject
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (e) {
      this.#reject(e);
    }
  }

  #resolve(value) {
    if (!value) {
      return;
    }

    if (this.#isResolveOrRejectCalled) return;

    this.#isResolveOrRejectCalled = true;

    if (value instanceof MyPromise) {
      value.then((v) => {
        this.#status = PROMISE_STATUS.FULFILLED;
        this.#result = v;
        this.#executehandlers();
      });
      return;
    }

    this.#status = PROMISE_STATUS.FULFILLED;
    this.#result = value;
    this.#executehandlers();
  }

  #reject(error) {
    if (!error) {
      return;
    }

    if (this.#isResolveOrRejectCalled) return;
    this.#isResolveOrRejectCalled = true;

    this.#status = PROMISE_STATUS.REJECTED;
    this.#result = error;
    this.#executehandlers();
  }

  then(onFulfilled, onRejected) {
    const handler = {
      onFulfilled:
        typeof onFulfilled === "function" ? onFulfilled : (value) => value,
      onRejected:
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
              throw reason;
            },
    };
    const promise = new MyPromise((resolve, reject) => {
      handler.resolve = resolve;
      handler.reject = reject;
    });

    this.#handlers.push(handler);

    if (this.#status !== PROMISE_STATUS.PENDING) {
      this.#executehandlers();
    }

    return promise;
  }

  #executehandlers() {
    for (const { onFulfilled, onRejected, resolve, reject } of this.#handlers) {
      const handler =
        this.#status === PROMISE_STATUS.FULFILLED ? onFulfilled : onRejected;
      queueMicrotask(() => {
        if (typeof handler !== "function") {
          return;
        }

        try {
          const returnValue = handler(this.#result);
          if (!(returnValue instanceof MyPromise)) {
            resolve(returnValue);
          } else {
            returnValue.then(resolve, reject);
          }
        } catch (error) {
          if (typeof reject === "function") {
            reject(error);
          }
        }
      });
    }

    this.#handlers = [];
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
}

// const mp1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => resolve(1), 100);
// });
// const mp2 = MyPromise.resolve(2);
// const mp = new MyPromise((resolve, reject) => {
//   resolve(mp1);
//   resolve(mp2);
//   reject(3);
// }).then(
//   (data) => {
//     console.log("resolve", data);
//   },
//   (reason) => {
//     console.log("reject", reason);
//   }
// );

// 1.) Basic Promise Resolve
// const p1 = new MyPromise((resolve) => {
//   resolve("Hello, World!");
// });

// p1.then(console.log);

// 2.) Basic Promise Reject
// const p2 = new MyPromise((_, reject) => {
//   reject("Something went wrong!");
// });

// p2.catch(console.log);

// 3.) resolve Called Multiple Times
// const p3 = new MyPromise((resolve) => {
//   resolve("First Call");
//   resolve("Second Call"); // Should be ignored
// });

// p3.then(console.log);

// 4.) reject Called Multiple Times
// const p4 = new MyPromise((_, reject) => {
//   reject("First Error");
//   reject("Second Error"); // Should be ignored
// });

// p4.catch(console.log);

// 5.) Calling resolve() After reject()
// const p5 = new MyPromise((resolve, reject) => {
//   reject("Initial Rejection");
//   resolve("Should be ignored");
// });

// p5.catch(console.log);

// 6.) Calling reject() After resolve()
// const p6 = new MyPromise((resolve, reject) => {
//   resolve("Initial Resolution");
//   reject("Should be ignored");
// });

// p6.then(console.log).catch(console.error);

// 7.) Error Thrown Inside Executor
// const p7 = new MyPromise(() => {
//   throw new Error("Crash!");
// });

// p7.catch(console.log);

// 8.) .then() Registered After Resolution
// const p8 = new MyPromise((resolve) => {
//   resolve("Instant Value");
// });

// setTimeout(() => {
//   p8.then(console.log); // Should execute immediately
// }, 2000);

// 9.) .then() Registered Before Resolution
// const p9 = new MyPromise((resolve) => {
//   setTimeout(() => resolve("Delayed Value"), 1000);
// });

// p9.then(console.log);

// 10.) Chaining Multiple .then() Calls
// const p10 = new MyPromise((resolve) => {
//   resolve(10);
// });

// p10
//   .then((value) => value * 2)
//   .then((value) => value + 5)
//   .then(console.log);

// 11.) Handling Chained Promise Resolution
// const p11 = new MyPromise((resolve) => {
//   resolve(new MyPromise((res) => res("Nested Promise!")));
// });

// p11.then(console.log);
