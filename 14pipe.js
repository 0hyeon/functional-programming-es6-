const { add,log,reduce } = require("./libs/fx")

//코드를 값으로 다루어 표현혁 높이기 
const go = (...args) => reduce((a,f)=> f(a),args);//a : 시작값 
const pipe = (f,...fs) => (...as) => go(f(...as), ...fs);
go(
    add(0 , 1),
    a => a + 10,
    a => a + 100,
    log
);//111

// ...rest로 받으면 배열형태로 받음 

const f = pipe(
  (a,b) => a + b,
  a => a + 10,
  a => a + 100,
)
  
  log(f(0,1));