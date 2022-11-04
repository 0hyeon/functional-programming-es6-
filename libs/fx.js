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

module.exports = {
  log,
  map,
  filter,
  reduce
}