//Using Closure

(() => {
  let instances = [];
  const [_setTimeout, _clearTimeout] = [window.setTimeout, window.clearTimeout];

  window.setTimeout = function (callback, delay, context) {
    const instanceId = _setTimeout(
      (...args) => {
        const indexOfInstanceId = instances.indexOf(instanceId);
        if (indexOfInstanceId === -1) {
          instances.splice(indexOfInstanceId, 1);
        }
        callback.apply(context || this, args);
      },
      delay,
      context
    );
    instances.push(instanceId);
    return instanceId;
  };

  window.clearTimeout = function (instanceId) {
    const wasCleared = _clearTimeout(instanceId);
    const indexOfInstanceId = instances.indexOf(instanceId);
    if (indexOfInstanceId === -1) {
      instances.splice(indexOfInstanceId, 1);
    }
    return wasCleared;
  };

  window.clearAllTimeout = function () {
    instances.forEach((instance) => {
      _clearTimeout(instance);
    });
    instances = [];
  };
})();

// The thing about setTimeout or setInterval is everytime we create one they return the highest id for ex :
// if we already have 3 setTimeouts and we declare another one it will return you 4
// Thus using that we can just iterate from 1 to 4 or highest id and clear each timeout by using window.clearTimeout(id)

// function clearAllTimeout() {
//   let currentInstance = setTimeout(() => {
//     while (currentInstance) {
//       clearTimeout(currentInstance--);
//     }
//   }, 0);
// }

// setTimeout(() => {
//   console.log("------11-------");
// }, 1000);

// setTimeout(() => {
//   console.log("------22-------");
// }, 10000);

// setTimeout(() => {
//   console.log("------33-------");
// }, 3000);

// clearAllTimeout();
