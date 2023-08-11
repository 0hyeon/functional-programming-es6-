const log = console.log;

const curry = f => (a, ..._) => _.length ? f(a,..._) : (..._) => f(a,..._);//인자가 두개일경우 실행되는 함수

const map = curry((f, iter) => {
  //map((p) => p.price, products)
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});
const filter = curry((f, products) => {
  //f = 보조함수에게 조건을 위임
  let res = [];
  for (const a of products) {
    if (f(a)) res.push(a); // if (a.price <= 20000)
  }
  return res;
});
const reduce = curry((f, acc, iter) => {
  //add함수,초기값, 데이터배열
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; //acc를 만듬
  }//iter 1번값을 시작값세팅 
  for (const a of iter) {
    acc = f(acc, a); //f안에 인자두개는
  }
  return acc;
});
const add = (a, b) => a + b;
const products = [
  { name: "반팔티", price: 15000, quanity: 1 },
  { name: "긴팔", price: 20000, quanity: 2 },
  { name: "핸드폰케이스", price: 15000, quanity: 3 },
  { name: "후드티", price: 30000, quanity: 4 },
  { name: "바지", price: 25000, quanity: 5 },
];
const go = (...args) => reduce((a,f)=> f(a),args);//a : 시작값,  f는 다음값 

const pipe = (f,...fs) => (...as) => go(f(...as), ...fs);
module.exports = {
  products,
  log,
  map,
  filter,
  reduce,
  add,
  curry,
  go,
  pipe
}