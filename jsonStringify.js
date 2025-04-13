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

function stringifyArr(value, replacerFn, space, depth) {
  let stringifiedArrayData = [];

  for (const [index, val] of value.entries()) {
    if (Number.isNaN(index)) {
      continue;
    }

    let updatedVal = replacerFn ? replacerFn(String(i), value[i]) : value[i];
    const typeOfValue = detectValueType(updatedVal);
    let serialized;
    switch (typeOfValue) {
      case "array":
        serialized = stringifyArr(val, replacerFn, space, depth + 1);
        break;
      case "object":
      case "map":
        serialized = stringifyObj(val, replacerFn, space, depth + 1);
        break;
      case "symbol":
      case "function":
      case "undefined":
        serialized = "null";
        break;
      default:
        serialized = _stringify(typeOfValue, val);
    }
    stringifiedArrayData.push(serialized);
  }

  const indent = space ? "\n" + space.repeat(depth) : "";
  const closingIndent = space ? "\n" + space.repeat(depth - 1) : "";
  return `[${indent}${stringifiedArrayData.join(
    space ? ",\n" + space.repeat(depth) : ","
  )}${closingIndent}]`;
}

function stringifyObj(value, replacerFn, space, depth) {
  let stringifiedValue = [];

  for (const key of Object.keys(value)) {
    let val = replacerFn ? replacerFn(key, value[key]) : value[key];
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

  const indent = space ? "\n" + space.repeat(depth) : "";
  const closingIndent = space ? "\n" + space.repeat(depth - 1) : "";
  return `{${indent}${stringifiedValue.join(
    space ? ",\n" + space.repeat(depth) : ","
  )}${closingIndent}}`;
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

function stringify(value, replacer, space) {
  if (isCyclic(value)) {
    throw new TypeError("Converting circular structure to JSON");
  }

  let replacerFn = null;
  if (typeof replacer === "function") {
    replacerFn = replacer;
  } else if (Array.isArray(replacer)) {
    const keySet = new Set(replacer.map(String));
    replacerFn = (key, val) =>
      keySet.has(key) || key === "" ? val : undefined;
  } else {
    replacerFn = null;
  }

  const indent =
    typeof space === "number"
      ? " ".repeat(Math.min(10, space))
      : typeof space === "string"
      ? space.slice(0, 10)
      : "";

  const typeOfValue = detectValueType(value);

  if (typeOfValue === "array") {
    return stringifyArr(value, replacerFn, indent, 1);
  }

  if (typeOfValue === "object" || typeOfValue === "map") {
    return stringifyObj(value, replacerFn, indent, 1);
  }

  const result = _stringify(
    typeOfValue,
    replacerFn ? replacerFn("", value) : value
  );

  return result === undefined ? undefined : result;
}

// const sym = Symbol();
// console.log(stringify(sym));

// const arr = [Symbol("key")];
// console.log(JSON.stringify(arr));

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

// const arrs = [];
// arrs[2] = "hello";
// arrs[10] = "Bye";

// console.log(stringify(arrs));

// function replacer(key, value) {
//   // Filtering out properties
//   if (typeof value === "string") {
//     return undefined;
//   }
//   return value;
// }

// const foo = {
//   foundation: "Mozilla",
//   model: "box",
//   week: 45,
//   transport: "car",
//   month: 7,
// };
// console.log(stringify(foo, replacer));

// function makeReplacer() {
//   let isInitial = true;

//   return (key, value) => {
//     if (isInitial) {
//       isInitial = false;
//       return value;
//     }
//     if (key === "") {
//       // Omit all properties with name "" (except the initial object)
//       return undefined;
//     }
//     return value;
//   };
// }

// const replacer1 = makeReplacer();
// console.log(stringify({ "": 1, b: 2 }, replacer1));

const foos = {
  foundation: "Mozilla",
  model: "box",
  week: 45,
  transport: "car",
  month: 7,
};

console.log(stringify(foos, ["week", "month", 1, "model"]));

console.log(stringify({ uno: 1, dos: 2 }, null, "-------"));
