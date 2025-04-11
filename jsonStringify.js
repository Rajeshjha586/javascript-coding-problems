const VALUE_TYPES = new Map([
  [Number, "number"],
  [String, "string"],
  [Boolean, "boolean"],
  [Array, "array"],
  [ArrayBuffer, "arraybuffer"],
  [Date, "date"],
  [Set, "set"],
  [Map, "map"],
  [WeakSet, "weakSet"],
  [WeakMap, "weakMap"],
  [Symbol, "symbol"],
]);

function isCyclic(value) {
  const seen = new Set();

  function hasCycle(obj) {
    if (typeof obj !== "object" || obj === null) return false;

    if (seen.has(obj)) return true;

    seen.add(obj);

    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        const val = obj[key];
        if (hasCycle(val)) return true;
      }
    }

    return false;
  }

  return hasCycle(value);
}

function detectValueType(value) {
  if (value === null) return "null";

  const type = typeof value;

  if (type === "number") {
    if (Number.isNaN(value)) return "NaN";
    if (value === Infinity) return "infinity";
    return "number";
  }

  if (type !== "object") return type;

  for (const [type, name] of VALUE_TYPES.entries()) {
    if (value instanceof type) return name;
  }

  return "object";
}

function stringifyArr(value) {
  let stringifiedArrayData = [];

  for (const [index, val] of value.entries()) {
    if (Number.isNaN(index)) {
      continue;
    }

    const typeOfValue = detectValueType(val);

    switch (typeOfValue) {
      case "array":
        stringifiedArrayData.push(stringifyArr(val));
        break;
      case "object":
      case "map":
        stringifiedArrayData.push(stringifyObj(val));
        break;
      case "symbol":
      case "function":
      case "undefined":
        stringifiedArrayData.push("null");
        break;
      default:
        stringifiedArrayData.push(_stringify(typeOfValue, val));
    }
  }

  return `[${stringifiedArrayData.join(",")}]`;
}

function stringifyObj(value) {
  let stringifiedValue = [];

  for (const key of Object.keys(value)) {
    const val = value[key];
    const typeOfValue = detectValueType(val);

    if (
      typeOfValue === "symbol" ||
      typeOfValue === "function" ||
      typeOfValue === "undefined"
    ) {
      continue;
    }

    let stringifiedKey = `\"${key}\":`;

    switch (typeOfValue) {
      case "array":
        stringifiedKey += stringifyArr(val);
        break;
      case "object":
      case "map":
        stringifiedKey += stringifyObj(val);
        break;
      default:
        stringifiedKey += _stringify(typeOfValue, val);
    }

    stringifiedValue.push(stringifiedKey);
  }

  return `{${stringifiedValue.join(",")}}`;
}

function _stringify(typeOfData, value) {
  switch (typeOfData) {
    case "string":
      return `\"${value}\"`;
    case "number":
    case "boolean":
      return String(value);
    case "function":
      return undefined;
    case "symbol":
      return undefined;
    case "date":
      return `"${value.toISOString()}"`;
    case "set":
    case "map":
    case "weakSet":
    case "weakMap":
      return "{}";
    case "bigint":
      throw new Error("TypeError: BigInt value can't be serialized in JSON");
    default:
      return "null";
  }
}

function stringify(value) {
  if (isCyclic(value)) {
    throw new TypeError("Converting circular structure to JSON");
  }

  const typeOfValue = detectValueType(value);

  if (typeOfValue === "array") {
    return stringifyArr(value);
  }

  if (typeOfValue === "object" || typeOfValue === "map") {
    return stringifyObj(value);
  }

  const result = _stringify(typeOfValue, value);
  return result === undefined ? undefined : result;
}

// const sym = Symbol();
// console.log(stringify(sym));

const arr = [Symbol("key")];
console.log(JSON.stringify(arr));
// const List = function (val) {
//   this.next = null;
//   this.val = val;
// };

// const item1 = new List(10);
// const item2 = new List(20);
// const item3 = new List(30);

// item1.next = item2;
// item2.next = item3;
// item3.next = item1;

// console.log(stringify(item1));
