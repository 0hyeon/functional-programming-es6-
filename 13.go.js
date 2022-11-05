const { reduce } = require("./libs/fx")

//코드를 값으로 다루어 표현혁 높이기 
const go = (...args) => reduce((a,f)=> f(a),args);

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100
)//111