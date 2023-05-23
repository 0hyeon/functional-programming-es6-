const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

//products를 활용한 리듀서
export const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; //acc를 만듬
  }
  for (const a of iter) {
    acc = f(acc, a); //f안에 인자두개는
  }
  return acc;
};

console.log(
  //조건,초기값,넣을값

  //f안에 인자두개(totalPrice, product) 그리고 더해서 return
  reduce((totalPrice, product) => totalPrice + product.price, 0, products)
); //토탈가격
