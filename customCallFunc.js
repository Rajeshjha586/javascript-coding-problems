Function.prototype.customCallFunc = function(context = {}, ...args) {
    if(typeof this != 'function') {
        throw new Error(this+ 'It is not callable');
    }

    context.fn = this;
    context.fn(...args);
}

let jackName = {
    firstName: 'Jack',
    lastName: 'Reacher'
}

const printName = function(state, country) {
    console.log(this.firstName + " " + this.lastName + " " + state + " " + country);
}

printName.customCallFunc(jackName, "Delhi", "India");