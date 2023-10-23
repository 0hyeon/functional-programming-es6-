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
  const a = "test";
  const b = f(a);
  //b는 try타입이면서 결과를 넘버타입으로 사용
  const c = g(b);
  //반면 g는 넘버타입을 입력받는 함수이기때문에 에러
  //인자를 넘버로 사용하려면 어떻게해야할까?
  //b = T.Try<string, number> , g(b : number) 불일치

  //챕터5에서 map함수에 다양한모습 살펴보며 이런역할확인
  //우선 map으로 급한거부터 해결해보자
  const c2 = T.map(b, (b_) => g(b_));
  const c3 = T.map(b, g); //타입스크립트 에서는 함수g는인자가 하나인함수이고,  map이 인자로 사용하는함수도 인자가 하나이기  때문에 가능하다고 함

  //h함수도 마찬가지로 될까?

  const d = T.map(c3, (_c) => g(_c)); //안됨

  //c3의 타입이 중첩된 트라이 타입이기 때문이라고함
  //지난시간에 중첩된 부수효과를 하나의 부수효과로 합쳐주는 것은 flatMap을 사용한걸 알아보았다, map함수의 결과를 flat하는것이니
  //flatMap으로 해결 가능한다

  //두개에 부수효과를 하나의 부수효과로 합쳐주는 flatMap
  const c4 = T.flatMap(b, (b_) => g(b_));
  const d = T.flatMap(c4, (c_) => h(c_));

  program(d); //타입에러 program의 인자가 boolean이기 때문
  T.flatMap(d, (d_) => program(d_)); //에러
  //program함수의 결과가 try가 아니기 때문에 에러 map으로 표현가능
  T.map(d, (d_) => program(d_));
  //flatMap과,map함수 사용의 차이점은 부수효과가 동반되지 않는 함수에 부수효과가 포함된 인자를 사용할땐 둘다 사용
  //중첩되면 flatMap, 그렇지 않으면 Map사용

  //a를 다시 test로 바꾸보자 그러면 에러가 나지도 않고 프로그램이 강제종료가 되지도 않는다.
  greeting("World");
  console.log("프로그램이 종료되었습니다.");
};
//true
