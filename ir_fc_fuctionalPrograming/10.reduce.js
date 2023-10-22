const nums = [1, 2, 3, 4, 5];
let total = 0;

for (const a of nums) {
  total = total + a;
}
console.log(total);

const reduce = (f, acc, iter) => {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;

console.log(reduce(add, 0, [1, 2, 3, 4, 5]));
console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
//기대값 15

//초기값 두번째인자 없이도 3번째인자 첫번째 index를 초기값으로 optional하게 쓰는법
const reduce2 = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; //acc를 만듬
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

//reduce2 이렇게 작동함
// console.log(reduce(add, 1, [2, 3, 4, 5]));
console.log(reduce2(add, [1, 2, 3, 4, 5]));
