//부분적용 과 부분함수

//partial application (부분적용) : 인자가 여러개인 함수의 전체 인자 중에 인자 몇개를 고정하여,
// 더작은 개수의 인자를 가지는 또다른 함수를 생성하는 프로세스

const delevery = (present: string, from: string) => (to: string) => {
  return `
    보내는 물건 : ${present}
    보내는 사람 : ${from}
    받는 사람 : ${to}
    `;
};
export const main = () => {
  console.clear();
  const momsPresent = delevery("상품권", "엄마");
  console.log(momsPresent("아들"));
  console.log(momsPresent("딸"));
  console.log(momsPresent("할머니"));
};
