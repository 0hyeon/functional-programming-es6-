const { add,log,reduce,products,filter,map,go,pipe, curry } = require("./libs/fx")

//총수량
// const total_quanity = products => go(products,
//   map((p)=>p.price),
//   reduce((a,b)=>(a+b)),
// )

const total_quanity = pipe(// products중복
  map((p)=>p.quanity),
  reduce(add),
)

log(
  total_quanity(products)
)

const total_price = pipe(//합산된 모든 금액
  map((p)=>p.price * p.quanity),
  reduce(add),
)
log(
  total_price(products)
)

// 더 추상화 레벨을 높여서 사용해보도록 하자
const sum = curry((f,iter) => go(
  iter,
  map(f),
  reduce(add)
))

log(
  sum((p)=>p.price * p.quanity,products)
)
log(
  sum((p)=> p.quanity,products)
)
//리팩토링 하면

const total_quanity_rft = products => sum((p)=> p.quanity,products);

const total_price_rft = products => sum((p)=> p.price * p.quanity,products);
log(
  total_quanity_rft(products)
)
log(
  total_price_rft(products)
)

// sum함수에 커링을 하면 product제거가능

const total_quanity_rft2 = sum((p)=> p.quanity);

const total_price_rft2 = sum((p)=> p.price * p.quanity);
log(
  total_quanity_rft2(products)
)
log(
  total_price_rft2(products)
)

//리팩토링된 sum함수는 user도 응용가능
log( 
  sum (u => u.age, [
      {age : 13},
      {age : 14},
      {age : 15},
    ]
  )
);