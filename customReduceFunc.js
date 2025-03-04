// Array.prototype.customReduceFunc = function(callback, initialValue) {
//     let result = initialValue ?? this[0];

//     for(let i=initialValue ? 0 : 1; i<this.length; i++) {
//         result = callback(result, this[i], i, this);
//     }

//     return result;
// }

// const result = [1, 2, 3, 4, 5, 6].customReduceFunc((acc, currentValue) => {
//     console.log(acc, currentValue);
//     return acc + currentValue;
// });

// console.log(result)

Array.prototype.customReduceFunc = function(...args) {
    const hasInitialValue = args.length > 1;
    
    if(!hasInitialValue && this.length === 0) {
        throw new Error('Reduce of empty array with no initial value');
    }

    let result = hasInitialValue ? args[1] : this[0];

    for(let i=hasInitialValue ? 0 : 1; i<this.length; i++) {
        result = args[0](result, this[i], i, this);
    }

    return result;
}

const result = [1, 2, 3].reduce((acc, currentValue) => {
    console.log(acc, currentValue);
    return acc + currentValue;
});

console.log(result)