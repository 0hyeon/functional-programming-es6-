// 커링(Currying):
//인자가 여러개인 함수를 인자가 하나인 함수들의 함수열(sequence of functions)로 만들기
//이러한 함수를 curried function
//ex) (a:A)=>(b:B)=>(c:C)=>D
// const delevery = (present: string) => (from: string) => (to: string) => {

//인자가 여러개인 함수: (A,B,C)=>D
//커링을 적용 curry((A,B,C)=>D)
//(커링이된함수)curried function : (A)=>(B)=>(C)=>D
const delevery = (present: string, from: string, to: string) => {
  return `
    보내는 물건 : ${present}
    보내는 사람 : ${from}
    받는 사람 : ${to}
    `;
};
const curry3 =
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
  //개별적인 함수를 개별적으로
  (a: A) =>
  (b: B) =>
  (c: C) =>
    f(a, b, c);

//이제 위 커링함수로 딜리버링을 커버해보자
const curriedDelivery = curry3(delevery);

export const main = () => {
  console.clear();
  const momsPresend = curriedDelivery("cultureLand")("mom");
  console.log(momsPresend("son"));
};
