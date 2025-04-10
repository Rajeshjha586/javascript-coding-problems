class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(listener);

    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    let indexOf = this.events[eventName].indexOf(listener);

    if (indexOf !== -1) {
      this.events[eventName].splice(indexOf, 1);
    }
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];

    this.events[eventName].forEach((fn) => {
      fn.apply(this, args);
    });

    return true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const emitter = new EventEmitter();

  function greetHello(name) {
    console.log(`Hello, ${name}`);
  }

  function funMessage(name) {
    console.log(`Yep! cool, You are funny event emitter :: ${name}`);
  }

  emitter.on("sayHi", greetHello);
  emitter.on("sayHi", funMessage);
  emitter.emit("sayHi", "Alice");
  emitter.off("sayHi", greetHello);
  emitter.emit("sayHi", "Bob");
});
