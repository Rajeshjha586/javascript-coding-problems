Array.prototype.customMap = function(cb) {
    let temp = [];

    for(let i = 0; i < this.length; i++) {
        temp.push(cb(this[i], i, this));
    }

    return temp;
}

const nums = [1, 2, 3, 4];

const multiplybyTwo = nums.customMap((num, i, arr) => {
    return num * 2;
})

console.log(multiplybyTwo);

const multiplybyFivePlusIndex = nums.customMap((num, i, arr) => {
    return num * 5 + i;
})

console.log(multiplybyFivePlusIndex);