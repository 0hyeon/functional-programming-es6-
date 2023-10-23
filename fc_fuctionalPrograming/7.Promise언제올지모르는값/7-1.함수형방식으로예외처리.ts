const f = (str: string) => {
  if (str === "") {
    throw new Error("빈 문자열은 입력할 수 없습니다");
  }
  return str.length * 2;
};
const g = (n: number) => {
  if (n === 6) {
    throw new Error("6은 입력할 수 없습니다.");
  }
  return n + 1;
};
const h = (x: number) => {
  if (x === 5) {
    throw new Error("5는 입력할 수 없습니다.");
  }
  return x % 3 === 0;
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
const main2 = () => {
  //코드의 실행이 이전결과에 의존적
  //결과에 부수효과가 포함되는것도 일반적인 상황
  //예외라는 부수효과 묵시적으로 포함
  try {
    const a = "abc";
    const b = f(a);
    // const c = g(b);
    //코드중간에 에러를 처리하는걸 추가하기
    //함수 g에서 에러가 발생할경우 코드 실행을 중단하지않고 3이라는 값으로 코드를 계속 실행하고싶을경우 어떻게?
    //g함수의 에러처리를 별도로 감싸서 처리
    let c;
    try {
      c = g(b);
    } catch (e) {
      c = 3; //에러일경우3 => getOrElse함수 사용으로처리
    }
    const d = h(c);
    program(d);
  } catch (e) {
    //에러시 실행
    //위에코드와는 다르게 독립적으로 실행
    //에러는 에러대로 출력되고 밑에코드는 독립적으로 따로 잘 실행됨
    //같은일을 하는 코드를 try 타입을 사용해서 구현하며 어떻게 될까요? 7-1.5로 이동
    greeting("world");
    console.log("프로그램이 종료되었습니다.");
  }
};
main2();
