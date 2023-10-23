import * as T from "../try";
const f = (str: string): T.Try<string, number> => {
  if (str === "") {
    throw T.failed("빈 문자열은 입력할 수 없습니다");
  }
  return T.success(str.length * 2);
};
const g = (n: number): T.Try<string, number> => {
  if (n === 6) {
    return T.failed("6은 입력할 수 없습니다.");
  }
  return T.success(n + 1);
};
const h = (x: number): T.Try<string, boolean> => {
  if (x === 5) {
    return T.failed("5는 입력할 수 없습니다.");
  }
  return T.success(x % 3 === 0);
};
const handleError = (e: unknown) => {
  console.log("handleError" + e);
};
const program = (b: boolean) => {
  console.log(b);
};
const greeting = (name: string) => {
  console.log("Hello, " + name);
};
const main = () => {
  const a = "abc";
  const b = f(a); //6
  //b는 try타입이면서 결과를 넘버타입으로 사용
  const c = g(b); //error
  //반면 g는 넘버타입을 입력받는 함수이기때문에 에러
  //인자를 넘버로 사용하려면 어떻게해야할까?
  //b = T.Try<string, number> , g(b : number) 불일치

  //챕터5에서 map함수에 다양한모습 살펴보며 이런역할확인
  //우선 map으로 급한거부터 해결해보자
  const c1 = T.map(b, (b_) => T.getOrElse(g(b_), (e) => 3));
  //flatMap을 사용하면 아래와 같다
  const c2 = T.flatMap(b, (b_) => T.success(T.getOrElse(g(b_), (e) => 3)));
  const c3 = T.map(b, g); //타입스크립트 에서는 함수g는인자가 하나인함수이고,  map이 인자로 사용하는함수도 인자가 하나이기  때문에 가능하다고 함

  //=> 코드를 이런방식으로 작성하라는 것이 아니라 이런방식을 알고있다면 해겨하기 쉬워지는 문제가 있을것.

  const d = T.map(c3, (_c) => g(_c)); //error

  //c3의 타입이 중첩된 트라이 타입이기 때문이라고함
  //지난시간에 중첩된 부수효과를 하나의 부수효과로 합쳐주는 것은 flatMap을 사용한걸 알아보았다, map함수의 결과를 flat하는것이니
  //flatMap으로 해결 가능한다

  //두개에 부수효과를 하나의 부수효과로 합쳐주는 flatMap
  const c4 = T.flatMap(b, (b_) => g(b_)); //ok
  const d1 = T.flatMap(c4, (c_) => h(c_));

  program(d1); //error program의 인자가 boolean이기 때문
  T.flatMap(d1, (d_) => program(d_)); //error
  //program함수의 결과가 try가 아니기 때문에 에러 map으로 표현가능

  const result = T.map(d1, (d_) => program(d_)); //ok

  //flatMap과,map함수 사용의 차이점은 부수효과가 동반되지 않는 함수에 부수효과가 포함된 인자를 사용할땐 둘다 사용
  //truCatch가 중첩되면 flatMap, 그렇지 않으면 Map사용

  //a를 다시 test로 바꾸보자 그러면 에러가 나지도 않고 프로그램이 강제종료가 되지도 않는다.
  greeting("World");
  console.log("프로그램이 종료되었습니다.");
  //true

  //a를 "abc"로바꿨을때
  //throw new error를 사용했던것과는 달리, 프로그램이 에러가 생기지도 않고
  //프로그램이 강제 종료 되지도 않았다.
  //true나 false도 호출되지않을걸로 봐서, program함수가 호출되지않았단 얘기

  //그이유는 map함수에서 성공할때(try타입)과 실패할때(자기자신 리턴)에 failed를 실행해서 자기자신을 리턴 따라서 결과는 계속 유지. (flatMap은 map으로 구현)
  // => failed("6은입력할 수 없습니다.")

  //try 타입에 map과 flatMap을 사용한다면,에러가발생할때 정보가 사라지지 않고 계속해서 값으로 유지된다는것, 따라서  코드가 하나의 흐름으로 실행되는 마지막부분에서 에러처리를 추가하면 에러를 핸들링하는 코드를 매라인마다 처리할 필요가 없다.

  //이런 역할을 하는 함수는 뭐가 있을까? getOrElse함수의 용도를 지금까지는 실패일때 기본값을 지정하는 함수라고 얘기해왔는데 여기서 용도를 하나더 찾아볼수있다.

  //그것은 바로 에러일때만 특정동작을 수행할수있는 함수로도 사용할수있다
  T.getOrElse(result, (e) => handleError(e));
  //이코드가 작성된 모습을 보면 어딘가 낮이익는 패턴
  //명령적 코드와 거의 동일한 방식으로 작성이 가능

  //성공과 실패라는 함수의 값으로도 리턴할수도 있고 중간에 또다른 에러를 처리하는것도 쉬워진다.
};
