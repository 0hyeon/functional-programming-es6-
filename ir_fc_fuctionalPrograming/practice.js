const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const filter = (f,products) =>{
  let res = []
  for (const a of products){
    if(f(a)) res.push(a)
  }
  return res
}
console.log(
  filter( (p)=>p.price < 20000 , products)
);