function isEqual(a, b, visited = new Map()) {
    // Step1: Verify NaN Values
    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true;
    }
  
    // Undefined check
    if (a === undefined || b === undefined) {
      return a === b;
    }
  
    // Step2: Verify Null Values
    if (a === null || b === null) {
      return a === b;
    }
  
    // Step3: Verify Primitives
    if (typeof a !== "object" || typeof b !== "object") {
      return a === b;
    }
  
    // Step4: Handle Circular References
    if (visited.has(a) || visited.has(b)) {
        return true;
    }
  
    visited.set(a, b);
  
    // Step5: Verify Arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
  
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i], visited)) return false;
      }
      return true;
    }
  
    // Step6: Verify Objects
    if(typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
  
      if (keysA.length !== keysB.length) return false;
  
      for (let key in keysA) {
        if (b.hasOwnProperty(key)) {
          if (!isEqual(a[key], b[key], visited)) return false;
        }
      }
    }
  
    // Step7: Verify Set
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      return [...a].every(value => b.has(value));
    }

    // Step8: Verify Map
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (let [key, value] of a) {
        if (!b.has(key) || !isEqual(value, b.get(key), visited)) return false;
      }
      return true;
    }
  
    // Step9: Verify Date
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    // Step9: Verify Regex
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.toString() === b.toString();
    }
  
    return true;
}

// Primitive Comparisons
console.log("-----------------------------Primitive Comparisons------------------------------")
console.log(isEqual(1, '1')); // false
console.log(isEqual(1, 1)); // true
console.log(isEqual(null, undefined)); // false
console.log(isEqual(false, 0)); // false
console.log(isEqual(true, 1)); // false
console.log(isEqual(1, Number(1))); // true

// Array Comparison
console.log("-----------------------------Array Comparison------------------------------");
console.log(isEqual([], [])); // true (Empty arrays are equal)
console.log(isEqual([1,2,3], [1,2,3])); // true (Same elements, same order)
console.log(isEqual([1,2,3], [1,2,3,4])); // false (Different lengths)
console.log(isEqual([1,2,3,4], [1,2,3])); // false (Different lengths)
console.log(isEqual([1,2,3], [1,2,'3'])); // false (Same values, different types)

// Circular Reference in Array
console.log("-----------------------------Circular Reference in Array------------------------------")
const arr1 = [1,2,3];
arr1.push(arr1);
const arr2 = [1,2,3];
arr2.push(arr2);
console.log(isEqual(arr1, arr2)); // true (Circular references)

// Object Comparisons
console.log("-----------------------------Object Comparisons------------------------------")
console.log(isEqual({a: 1}, {a: 1})); // true (Same key-value pairs)
console.log(isEqual({a: 1}, {a: 1, b: 2})); // false (Extra key in second object)
console.log(isEqual({a: 1, b: 2}, {a: 1})); // false (Missing key in second object)
console.log(isEqual({a: {a: 1}}, {a: {a: 1}})); // true (Nested objects are equal)
console.log(isEqual({a: {a: 1, b:2, c: 3}}, {a: {c:3, b: 2, a: 1}})); // true (Different key order)
console.log(isEqual([{a: {a: 1}}, 1, 2, [3,4]], [{a: {a: 1}}, 1, 2, [3,4]])); // true (Nested objects in arrays)

// Circular Reference in Objects
console.log("-----------------------------Circular Reference in Objects------------------------------")
const obj1 = { a: 1 };
obj1.self = obj1;
const obj2 = { a: 1 };
obj2.self = obj2;
console.log(isEqual(obj1, obj2)); // true (Handles circular references)

// Special Object Comparisons
console.log("-----------------------------Special Object Comparisons------------------------------")
console.log(isEqual(new Date(2023, 0, 1), new Date(2023, 0, 1))); // true (Same date)
console.log(isEqual(new Date(2023, 0, 1), new Date(2024, 0, 1))); // false (Different date)
console.log(isEqual(/abc/i, /abc/i)); // true (Same regex pattern and flags)
console.log(isEqual(/abc/g, /abc/i)); // false (Different flags)

// Set Comparisons
console.log("-----------------------------Set Comparisons------------------------------")
console.log(isEqual(new Set([1,2,3]), new Set([1,2,3]))); // true (Same values in any order)
console.log(isEqual(new Set([1,2,3]), new Set([1,2,3,4]))); // false (Different size)
console.log(isEqual(new Set([1,2,3]), new Set([3,2,1]))); // true (Order doesn't matter in Set)

// Map Comparisons
console.log("-----------------------------Map Comparisons------------------------------")
const map1 = new Map([[1, 'a'], [2, 'b']]);
const map2 = new Map([[1, 'a'], [2, 'b']]);
console.log(isEqual(map1, map2)); // true (Same key-value pairs)

const map3 = new Map([[1, 'a'], [2, 'c']]);
console.log(isEqual(map1, map3)); // false (Different values)