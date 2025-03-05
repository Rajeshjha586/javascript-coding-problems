Function.prototype.customApplyFunc = function(context = {}, args = []) {
    if(typeof this != 'function') {
        throw new Error(this+ 'It is not callable');
    }

    if(!Array.isArray(args)) {
        throw new Error("CreateListFromArayLike caled on object");
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

printName.customApplyFunc(jackName, ["Delhi", "India"]);