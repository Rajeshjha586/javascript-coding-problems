// Function.prototype.customBindFunc = function(...args) {
//     let obj = this;
//     let params = args.slice(1);

//     return function(...args2) {
//         obj.apply(params, [...args, ...args1]);
//     }
// }

Function.prototype.customBindFunc = function(context = {}, ...args) {
    if(typeof this != 'function') {
        throw new Error(this+ 'cannot be bound as it is not callable');
    }

    context.fn = this;

    return function(...newArgs) {
        return context.fn(...args, ...newArgs);
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

const fullName = printName.customBindFunc(jackName, "Delhi");
fullName("India");