// // odd

// function* odds(l) {
//   //제너레이터라고 불림
//   for (let i = 0; i < l; i++) {
//     if (i % 2) yield i;
//   }
// }
// let iter2 = odds(15);
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());

// 더 재밌는 제너레이터 만들기
function *infinity(i = 0) {
  //무한히생성됨
  while (true) i++;
}

// odds 와 infinity를 통해 재밌게 표현하기
// function* odds(l) {
//   for (i of infinity(1)) {
//     if (i % 2) yield i;
//     if (i == l) return;
//   }
// }

function *limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}
// let iter3 = limit(4, [1, 2, 3, 4, 5, 6]);
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());

// limit함수를 활용가능
function *odds(l) {
  for (const i of limit(l, infinity(1))) {
    //compared  for (i of infinity(1)) {
    if (i % 2) yield i;
    // if (i == l) return;
  }
}
let iter4 = odds(10);
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());


for (const a of odds(40)) console.log(a);