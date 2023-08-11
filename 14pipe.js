const { add,log,reduce } = require("./libs/fx")

//코드를 값으로 다루어 표현혁 높이기 
const go = (...args) => reduce((a,f)=> f(a),args);


//pipe함수는 내부에서 go를 사용하는 함수이기때문에 함수를 리턴
// pipe () => ()=> go()
const pipe = (f,...fs) => (...as) => go(f(...as), ...fs);
//f는 첫번째함수 add
//...fs는 함수들
//...as는 0과1이 함수체이닝 사용

// f는 (a,b)=>a+b이고 ...fs는 첫번째를 제외한 나머지고, ...as는 f의 인자값들이다


//시작하는 인자가 두개여야할때는 이렇게 작성
//밑에 go의 코드를 pipe에 만들어주면 된다.
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