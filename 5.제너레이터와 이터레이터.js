// 제너레이터/이터레이터
// 제너레이터 : 이터레이터를 실행하는 함수
function* gen() {
  yield 1;
  if (false) yield 2; //제너레이터는 문장을 통해 값을 조작할수있다.
  yield 3;
  return 100; //마지막값은 return값을 통해 value를 전달할 수 있다.
}
let iter = gen(); //제너레이터를 실행하는 이터변수
console.log(iter[Symbol.iterator]() == iter); //이터레이터의 실행 결과는 자기자신 // true
console.log(iter.next());
console.log(iter.next());
console.log(iter.next()); //제너레이터를 통해 쉽게 이터레이터를 만듦

//제너레이터를 실행하게 되면 결과가 이터러블이자 이터레이블 이기 때문에
for (const a of gen()) console.log(a); //순회를 할 수 있다. (순회할땐 리턴값없이 순회한다.)
//제너레이터를 문자를 통해 조작이 가능하다 = 위 포문을 제어하며 프로그래밍을 할 수 있다는 얘기
