//순수함수만 사용하는 이유는 합성을 쉽게하기위해
//프로시저나 서브루틴 과는 달리 부수효과가 포함되지 않는다.

//합성하기 어려운 부수효과 for문
function sum() {
  let sum = 0;
  for (let i = 0; i <= 100; i++) {
    sum += i;
  }
  return sum;
}
console.log(sum());

function sum_1_to_100() {
  function go(sum, i) {
    if (i > 100) {
      return sum;
    }
    return go(sum + i, i + 1);
  }
  return go(0, 1);
}
console.log(sum_1_to_100());
