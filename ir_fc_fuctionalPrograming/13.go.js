const { reduce, filter, map } = require("./libs/fx");

//코드를 값으로 다루어 표현력 높이기
const go = (...args) => reduce((a, f) => f(a), args); //a : 시작값
//args만 전달 [0,a => a + 1,a => a + 10,a => a + 100]

//reduce((a,f)=> f(a),[add(1,0),a => a + 1,a => a + 10,a => a + 100])

//인자 a는 ...args의 첫번째값
//첫번째 a를 두번째 함수에 인자에 넣어실행
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];
const add = (a, b) => a + b;

console.log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  )
);
go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
); //111

// ...rest로 받으면 배열형태로 받음

//...args =
