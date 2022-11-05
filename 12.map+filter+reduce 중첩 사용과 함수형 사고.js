const {log, map,filter,reduce} = require("./libs/fx.js");
const products = [
    { name: "반팔티", price: 15000 },
    { name: "긴팔", price: 20000 },
    { name: "핸드폰케이스", price: 15000 },
    { name: "후드티", price: 30000 },
    { name: "바지", price: 25000 },
  ];
  //가격을 뽑는 map함수
  log(map((p) => p.price, products));
  //filter를 적용한 map함수
  log(
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  );
  //reducer를적용한 복합함수
  const add = (a, b) => a + b;
  log(
    reduce(//합치고
      add,
      map(//맵을하고
        (p) => p.price,
        filter((p) => p.price < 20000, products)//필터하고
      )
    )
  );
