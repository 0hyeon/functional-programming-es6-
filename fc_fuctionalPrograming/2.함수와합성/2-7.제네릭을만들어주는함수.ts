import { getPrices } from "./2-6.함수와타입";
//함수에 타입을 달아주다보면,비슷하게 생긴 타입이 중복되는 경우가있다.
//타입에대한 중복을 입력된 함수를 그대로 리턴해주는값을 줄여서 아이텐티티 줄여서 아이디 라고 부른다.
//아이디를 만들어보자

//숫자를 그대로 돌려주는 함수
const idNumber = (n: number) => {
  return n;
};
//문자열을 그대로 돌려주는 함수
const idString = (s: string) => {
  return s;
};
//boolean값을 그대로 돌려주는 함수
const idBoolean = (b: boolean) => {
  return b;
};

//모든타입별로 따로 만들어야할까? 공통적이 있다.
//타입은 달라도 타입에 관계없이 구현은 모두 같다
//함수 구현부에 모습이 자기 자신의 입력값을 돌려주는 모습이 같음
//이러한 중복을 일반화시켜 제거한후 하나의 함수로 만들수있는 방법이 제네릭
//타입을 매개변수화시켜 어떠한 타입에 동작이라도 표시할수있다.

//어떤 타입의 값이라도 그대로 돌려주는 함수
//단점은 연산이 불가하고 본인을 그대로 리턴하는 경우에 해당
const id = <T>(x: T) => {
  return x;
};
//array만 단독으로 존재할경우 완전한 타입으로 볼수없는데요,
type T1 = Array<string>;
//이렇게 해야 비로소 타입이 정의된다.

//함수의모양을 유추해보자
export const isExpensive = (price: number | undefined) => {
  if (price === undefined) {
    return false;
  }
  return price > 10000;
};

const main = () => {
  const price = getPrices("tomato");
  return isExpensive(price);
};
//isExpensive, getPrices를 매개변수화 시킨 컴포즈를 작성

const price2 = getPrices("tomato");
export const compose_2 = (isExpensive, getPrices) => (name: string) => {};
compose_2(isExpensive, price2)("tomato");
// export const compose =
//   (
//     g: (y: number | undefined) => boolean,
//     f: (s: string) => number | undefined
//   ) =>
//   (x: string) => {
//     return g(f(x));
//   };

//두함수와 같은 타입을 가지는 함수에 사용할수있다.
//정의역과 공의역이 일치하는 모든함수를 합성할수있도록 제네릭을 사용할수있도록 사용

//s,x는 string으로 항상 같아야 하기 때문에 제네릭을 사용해 타입매개변수화 하자 => <A>
//f반환 타입과 g의 입력타입을 매개변수화

//g의 입력타입과, f의반환타입도 number | undefined로 똑같아서 같은 타입매개변수로사용 =>B

//g의 리턴타입이 boolean이 아니라 어떤타입이더라도 적용하기 위해 C로 적용하자
export const compose =
  <A, B, C>(g: (y: B) => C, f: (s: A) => B) =>
  (x: A) => {
    return g(f(x));
  };

// <A, B, C>(g: (y: B) => C, f: (s: A) => B) => (x: A) => C
// compose의 타입은 다음과 같은형태
// 쉽게 읽기위해서는
// <A, B, C>((B) => C, f: (A) => B) => (A) => C

// => isExpensive(getPrices("tomaoto"))
//위함수를 compose를 통해서 표현가능
const isExpensivePrice2 = compose(isExpensive, getPrices);

function isExpensivePrice(name: string): boolean {
  return isExpensive(getPrices(name));
}
