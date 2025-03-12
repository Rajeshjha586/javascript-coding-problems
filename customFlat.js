// Array.prototype.customFlat = function(depth = 1) {
//     if(!Array.isArray(this)) {
//         throw new Error(`${this}.flat is not a function`);
//     }

//     let result = [];
//     for(let i=0; i<this.length; i++) {
//         if(Array.isArray(this[i]) && depth > 0) {
//             result.push(...this[i].customFlat(depth - 1));
//         } else {
//             result.push(this[i]);
//         }
//     }

//     return result;
// }

Array.prototype.customFlat = function(depth = 1) {
    if (!Array.isArray(this)) {
        throw new TypeError(`${this}.flat is not a function`);
    }

    return this.reduce((acc, item) => {
        if (Array.isArray(item) && depth > 0) {
            acc.push(...item.customFlat(depth - 1));
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
};


const arr = [1, 2, 3, [[4, [5, 6]]]];
console.log(arr.customFlat(2)); //[ 1, 2, 3, 4, [ 5, 6 ] ]
console.log(arr.customFlat(3)); //[ 1, 2, 3, 4, 5, 6 ]
console.log(arr.customFlat()); //[ 1, 2, 3, [ 4, [ 5, 6 ] ] ]
