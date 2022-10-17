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
  let res = [];
  for (const a of products) {
    if (f(a)) res.push(a); // if (a.price <= 20000)
  }
  return res;
};
console.log(
  "20000이상 : ",
  filter((p) => p.price >= 20000, products)
);
//   console.log(map((p) => p.name, products));

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
