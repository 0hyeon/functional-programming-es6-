// 커링(Currying):
//인자가 여러개인 함수를
//인자가 하나인 함수들의
//함수열(sequence of functions)로 만들기
//이러한 함수를 curried function

// const delevery = (present: string) => (from: string) => (to: string) => {

const delevery = (present: string, from: string, to: string) => {
  return `
    보내는 물건 : ${present}
    보내는 사람 : ${from}
    받는 사람 : ${to}
    `;
};
const curry3 =
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
  (a: A) =>
  (b: B) =>
  (c: C) =>
    f(a, b, c);

export const main = () => {
  console.clear();
};
