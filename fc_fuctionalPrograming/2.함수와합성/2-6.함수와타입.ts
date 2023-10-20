export function getPrices(name: string): number | undefined {
  if (name === "tomato") {
    return 7000;
  } else if (name === "orange") {
    return 15000;
  } else if (name === "apple") {
    return 8000;
  }
}

//함수를 잇는다는 개념은 어떤개념일까?
//함수를 어떻게 이어야 하나에 함수가 될까
//이러한 개념을 알아보기 위해 정의역과 공역이 일치하는것에 대해서 알아보자

//비싼지 알아보는 함수
const isExpensive = (price: number | undefined) => {
  if (price === undefined) {
    return false;
  }
  return price > 10000;
};

const main = () => {
  const price = getPrices("tomato");
  return isExpensive(price); //isExpensive 인자타입과 getPrices의 리턴타입을 일치시켜줘야 에러발생x
};
// 컴파일러가 알려주지 않았다면 런타임에러가 발생
// 이런 종류에 에러는 항상 재현되는것이 아니라 디버깅이 까다로울것
// 그렇다면 번거로워서 생산성이 떨어진다고 생각하는게 아니라 감사한것

//리팩토링해서 하나의 함수로 만들기
function isExpensivePrice(name: string): boolean {
  return isExpensive(getPrices(name));
}

//getPrices(name)결과를 인자로 넣어 boolean을 리턴한는 함수로 합쳐줌
//정의역과 공역이 일치하면 계속해서 함수를 합성하는 고차함수를 만들수 있다

//위함수를 compose를 통해서 표현가능
// export const isExpensivePrice = compose(isExpensive,getPrices)
