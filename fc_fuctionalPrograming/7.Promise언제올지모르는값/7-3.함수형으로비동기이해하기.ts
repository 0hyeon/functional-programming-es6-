//동기vs 비동기 :  논킹 , 블록킹의 개념과 같다 

//자스는 단일스레드 한줄에 하나의 실행한다. 

//js에서의 싱글스레드 예
const f = (str: string) => {
  setTimeout(() => {
    console.log("비동기로 출력 :" + str);
  }, 500); //비동기가 독립적으로 실행될때는 문제x
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
const greeting = (name: string) => {
  console.log("Hello, " + name);
};
const id = <A>(a:A):A => {
  return a
}

const cpsId = <A>(a:A,ret:(a:A) => void) => {//값이 준비되면 전달된 타입을 전달  함수의 이름은 콜백함수로 ret 함수를 통해서 리턴을 전달 함수의 결과는 함수의 실행과 동기된다.
  ret(a)
}

export const main = () => {
  const a = f("text"); // f함수의 호출이 완료되면
  const a1 = id('text')
  console.log(a1)//

  console.log(a); //f의 결과를 화면에 출력한다.
  //cpu가아닌 자바스크립트 엔진에 의해 이벤트루프가 끝나게 되면 a가 출력하게 된다.
  //예를들어 f함수에서의 setTimeout 이후에 실행하는 코드를 하게 된다면?
  greeting("world"); //io작업
};
