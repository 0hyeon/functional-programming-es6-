const log = console.log;
const map = (f, iter) => {
  //map((p) => p.price, products)
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};
const filter = (f, products) => {
  //f = 보조함수에게 조건을 위임
  let res = [];
  for (const a of products) {
    if (f(a)) res.push(a); // if (a.price <= 20000)
  }
  return res;
};
const reduce = (f, acc, iter) => {
  //add함수,초기값, 데이터배열
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; //acc를 만듬
  }
  for (const a of iter) {
    acc = f(acc, a); //f안에 인자두개는
  }
  return acc;
};
const add = (a, b) => a + b;
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];
module.exports = {
  products,
  log,
  map,
  filter,
  reduce,
  add
}