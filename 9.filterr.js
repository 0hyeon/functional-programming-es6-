const products = [
  { name: "반팔티", price: "15000" },
  { name: "긴팔", price: "20000" },
  { name: "핸드폰케이스", price: "15000" },
  { name: "후드티", price: "30000" },
  { name: "바지", price: "25000" },
];
// for (const p of products) {
//     names.push(p.name);
// }
const map = (f, iter) => {
  //함수,products
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

let uner20000 = [];
for (const p of products) {
  if (p.price > 20000) uner20000.push(p.name);
}
console.log(uner20000);

let over20000 = [];
for (const p of products) {
  if (p.price <= 20000) over20000.push(p.name);
}
console.log(over20000);

//filter를 적용하면
console.log(filter((p) => p.price >= 20000, products));

//뿐만아니라 이터러블 프로토콜을 통해서 다형성을 지원받는다
console.log(filter((n) => n % 2, [1, 2, 3, 4]));
