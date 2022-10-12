console.log("Arr_______________");
const arr = [1, 2, 3];
console.log(arr[Symbol.iterator]);
for (const a of arr) console.log(a);
console.log("Set_______________");
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);
console.log("Map_______________");
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map) console.log(a);
for (const a of map.keys()) console.log(a);
for (const a of map.values()) console.log(a);
for (const a of map.entries()) console.log(a);
// -이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
// -이터레이터 : {value, done} 객체를 리턴하는 next()를 가진 값
// -이터러블 / 이터레이터 프로토콜 : 이터러블을 for ... of, 전개 연산자등과 함께 동작하도록 규약
