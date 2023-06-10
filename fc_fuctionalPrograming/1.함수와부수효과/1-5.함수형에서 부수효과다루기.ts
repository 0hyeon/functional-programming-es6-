//순수함수만 사용하는 이유는 합성을 쉽게하기위해
//프로시저나 서브루틴 과는 달리 부수효과가 포함되지 않는다.

//합성하기 어려운 부수효과 for문(합성하기 어려움)
function sum() {
  let sum = 0;
  for (let i = 0; i <= 100; i++) {
    sum += i;
  }
  return sum;
}
console.log(sum());
//재귀를 통한 함수형프로그래밍 (순수함수 하지만 장황)
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
//매번 달라지지 않을만한 코드를 리팩토링 (일반화된 방식으로 추상화)
function loop(fn, acc, list) {
  if (list.length === 0) return acc;
  const [head, ...tail] = list;
  return loop(fn, fn(acc, head), tail);
}
//범위
const range = (start, end) =>
  Array.from({ length: end - start - 1 }, (_, index) => index + start);
//무엇을할지
const plus = (a, b) => a + b;
console.log(loop(plus, 0, range(1, 100))); //5050
