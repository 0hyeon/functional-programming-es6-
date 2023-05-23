const arr = [1, 2, 3];
// for (const a of arr) console.log(a);
const set = new Set([1, 2, 3]);
// for (const a of set) console.log(a);
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const a = [1, 2];
// a[Symbol.iterator] = null; //TypeError: a is not iterable
console.log([...a, ...arr, ...set, ...map.values()]); //이터러블을 따르는 값들을 제어 가능
