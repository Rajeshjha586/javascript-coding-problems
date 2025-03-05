Array.prototype.customBindFunc = function(...args) {
    let obj = this;
    let params = args.slice(1);

    return function(...args2) {
        obj.apply(params, [...args, ...args1]);
    }
}

let jackName = {
    firstName: 'Jack',
    lastName: 'Reacher'
}

let jamesName = {
    firstName: 'James',
    lastName: 'Bond'
}

const printName = function(state, country) {
    console.log(this.firstName + " " + this.lastName + " " + state + " " + country);
}

const fullName = printName.bind(jackName, "Delhi");
fullName("India");