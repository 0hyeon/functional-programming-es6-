  const { add,log,reduce,products,filter,map } = require("./libs/fx")
  
  //원하는 시점에 실행이 포인트 
  const curry = f => //함수를 받아서 
    (a, ..._) => _.length ? f(a,..._) : (..._) => f(a,..._);// 2개가 안될경우 그이후에 받을 값을 받아서 실행 
  
    const go = (...args) => reduce((a,f)=> f(a),args);//a : 시작값,  f는 다음값 
  
  const mult = curry((a, b) => a * b);
  // console.log(mult(1)(2));//2


  const mult3 = mult(3)
  // console.log(mult3(10));
  // console.log(mult3(2));
  // console.log(mult3(5));

  go(
    products,
    products => filter((p)=> p.price < 20000)(products),
    products => map((p)=> p.price)(products),
    prices => reduce(add)(prices),
    log
  )
  go(//products 생략 
    products,
    filter((p)=> p.price < 20000),
    map((p)=> p.price),
    reduce(add),
    log
  )