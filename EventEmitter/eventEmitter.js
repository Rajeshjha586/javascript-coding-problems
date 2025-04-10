class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
    console.log("test", this.events);

    return {
      release: () => {
        console.log("--------");
        const indexOf = this.events[eventName].indexOf(callback);
        if (indexOf !== -1) {
          this.events[eventName].splice(indexOf, 1);
        }
      },
    };
  }

  emit(eventName, ...args) {
    console.log("test 1", this.events);
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].forEach((fn) => {
      fn.apply(this, args);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector('input[type="text"]');
  const button = document.querySelector("button");
  const h1 = document.querySelector("h1");

  const emitter = new EventEmitter();

  // Subscribe a callback and keep a reference to release it later
  const subscription = emitter.subscribe("submitName", (data) => {
    h1.textContent = `Your name is: ${data.name}`;
  });

  // subscribe another test callback with same event name
  const testSubscription = emitter.subscribe("submitName", () => {
    console.log("SECOND SUBSCRIBER: I got called.");
  });

  // Release the second subscriber after 1 click
  let clickedOnce = false;

  button.addEventListener("click", () => {
    const name = input.value.trim();
    console.log("hjwwkwkwkw", name);
    if (name) {
      emitter.emit("submitName", { name });

      // On first click, remove the second subscriber and then first
      if (!clickedOnce) {
        testSubscription.release();
        clickedOnce = true;
        console.log("Second subscriber released.");
        subscription.release();
        console.log("First subscriber released.");
      }
    } else {
      h1.textContent = "Please enter your name.";
    }
  });
});
