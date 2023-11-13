//cps형태로 전달해보자 
const f = (str: string,ret:(x:number)=>void) => {
  setTimeout(() => {
    console.log("비동기로 출력 :" + str);
  }, 500); //비동기가 독립적으로 실행될때는 문제x
  ret(str.length * 2)
  // if (str === "") {
  //   throw new Error("빈 문자열은 입력할 수 없습니다");
  // }
  // return str.length * 2;
};
const g = (n: number,ret:(x:number)=>void) => {
  setTimeout(() => {
    console.log("g 호출", + n)  
    ret(n + 1)
  },500)
  // if (n === 6) {
  //   throw new Error("6은 입력할 수 없습니다.");
  // }
  // return n + 1;
};
const h = (x: number,ret:(x:boolean)=>void) => {
  setTimeout(()=>{
    console.log("n 호출", + x)  
    ret(x % 3 === 0)
  },500)
  // if (x === 5) {
  //   throw new Error("5는 입력할 수 없습니다.");
  // }
  // return x % 3 === 0;
};
const greeting = (name: string) => {
  console.log("Hello, " + name);
};
const program = (s:boolean) => {
  console.log(s);
}
//콜백지옥 (함수를 순차적으로 실행)
//명령적 코드가 계속되면서 가독성이 떨어짐
//cps의 합성의 형태가 콜백헬이라는 형태
export const main = () => {
  f("test",(a)=>{
    g(a,(b)=>{
      h(b,(c)=>{
        program(c)
      })

    })
  })

  greeting("world"); //io작업
  console.log("프로그램이 종료되었습니다.")
};
//다음시간엔 비동기를 순차적으로 콜백헬을 피하는 형태에 대해서 알아본다