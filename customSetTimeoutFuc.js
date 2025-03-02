function customSetTimeoutFunc() {
    let map = {};
    let timerID = 0;

    function setTimeoutPollyfill(callback, delay, ...args) {
        timerID++;
        map[timerID] = true;
        const date = Date.now();

        function triggerCallback() {
            if(!map[timerID]) {
                return;
            }

            if(Date.now() > date + delay) {
                callback.apply(this, args);
            } else {
                requestAnimationFrame(triggerCallback);
            }
            return timerID;
        }

        requestAnimationFrame(triggerCallback);
    }

    function clearTimeoutPloyfill(timerID) {
        if(map[timerID]) {
            delete map[timerID];
        }
    }

    return {setTimeoutPollyfill, clearTimeoutPloyfill};
}

const { setTimeoutPollyfill } = customSetTimeoutFunc();

console.log("1");
setTimeout((name) => {
    console.log(`Hello I am ${name}, Welcome to the JS world`);
}, 1000, "RJ19");

console.log("1");
setTimeoutPollyfill((name) => {
    console.log(`Hello I am ${name}, Welcome to the JS world`);
}, 1000, "RJ19");