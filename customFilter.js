Array.prototype.customFilter = function(cb) {
    let temp = [];

    for(let i = 0; i < this.length; i++) {
        if(cb(this[i], i, this)) {
            temp.push(this[i]);
        }
    }

    return temp;
}

const nums = [1, 2, 3, 4];
const moreThanOne = nums.customFilter((num) => {
    return num > 1;
});

console.log(moreThanOne);

const lessThanTwo= nums.customFilter((num) => {
    return num <= 2;
});

console.log(lessThanTwo);
