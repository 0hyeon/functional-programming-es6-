const { add,log,reduce,products,filter,map } = require("./libs/fx")

const go = (...args) => reduce((a,f)=> f(a),args);//a : 시작값,  f는 다음값 

const pipe = (f,...fs) => (...as) => go(f(...as), ...fs);


const total_price = pipe(
  map((p)=> p.price),
  reduce(add),
)

const base_total_price = predi => pipe (
  filter(predi),
  total_price,
)

// 1) 순서가 역순임
log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)//필터하고
    )
  )
);

//2) 순서 올바르게
go(
  products,
  products => filter((p)=> p.price < 20000)(products),
  products => map((p)=> p.price)(products),
  prices => reduce(add)(prices),
  log
)
//3 products 생략 
go(
  products,
  filter((p)=> p.price < 20000),
  total_price,
  log
)

//4
go(
  products,
  base_total_price((p)=> p.price < 20000),
  log
)