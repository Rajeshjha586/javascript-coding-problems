class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);

    return {
      release: () => {
        const indexOf = this.events[eventName].indexOf(callback);
        if (indexOf !== -1) {
          this.events[eventName].splice(indexOf, 1);
        }
      },
    };
  }

  emit(eventName, ...args) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].forEach((fn) => {
      fn.apply(this, args);
    });
  }
}
