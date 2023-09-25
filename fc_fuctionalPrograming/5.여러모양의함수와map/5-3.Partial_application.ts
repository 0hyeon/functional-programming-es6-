//부분적용 과 부분함수

//partial application (부분적용) : 인자가 여러개인 함수의 전체 인자 중에 인자 몇개를 고정하여,
// 더작은 개수의 인자를 가지는 또다른 함수를 생성하는 프로세스
// (a:A, b:B, c:C)=>D
// 에서
// (a:A, b:B)=>(c:C)=>D

//vs 커링
// 커링 : 여러매개변수를 받는 함수를 한개의 인자만 받는 단인자 함수들의 함수열로 만들기
// (a:A, b:B, c:C)=>D
// 에서
// (a:A)=>(b:B)=>(c:C)=>D

//이번챕터에서는 맵함수를 커링으로 다루고 이를 통해 얻을수있는것들을 알아보자

//여기선 부분적용에 대해서...
const delevery_0 = (present: string, from: string, to: string) => {
  return `
    보내는 물건 : ${present}
    보내는 사람 : ${from}
    받는 사람 : ${to}
    `;
};
//partial application을 적용시키면, 함수두개를 인자로
const delevery = (present: string, from: string) => (to: string) => {
  return `
    보내는 물건 : ${present}
    보내는 사람 : ${from}
    받는 사람 : ${to}
    `;
};
export const main0 = () => {
  console.log(delevery_0("상품권", "엄마", "아들"));
  console.log(delevery_0("상품권", "엄마", "딸"));
  console.log(delevery_0("상품권", "엄마", "할머니"));
};

//상품권을 자주보낸다면, parial applacation으로 바꿀수있다.
export const main = () => {
  console.clear();
  const momsPresent = delevery("상품권", "엄마");
  console.log(momsPresent("아들"));
  console.log(momsPresent("딸"));
  console.log(momsPresent("할머니"));
};
