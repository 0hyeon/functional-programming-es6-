import * as O from "../4.map함수가하는일/4-6-1.if문의합성";
// export const map = <A, B>(oa: Option<A>, f: (a: A) => B): Option<B> => {
//   if (isNone(oa)) return oa;
//   return some(f(oa.value));
export const curry2 =
  <A, B, C>(f: (a: A, b: B) => C) =>
  (a: A) =>
  (b: B): C =>
    f(a, b);
export const flip =
  <A, B, C>(f: (a: A, b: B) => C) =>
  (b: B, a: A): C =>
    f(a, b);
// Array<A> = A[] 같은표현
//표기법
//map :: (Array<A>, (A=>B)) => Array<B>
export const map = <A, B>(array: Array<A>, f: (a: A) => B): Array<B> => {
  const result: Array<B> = [];
  for (const value of array) {
    result.push(f(value));
  }
  return result;
};
const main = () => {
  const numbers = [1, 2, 3];
  const isEven = (x: number) => x % 2 === 0;

  //1).짝수를 나타내는 일반적인 표현
  map(numbers, isEven); //우리가만든 map함수
  numbers.map(isEven); //자바스크립트 내장함수

  //2).커링된 맵함수
  //curriedMap :: Array<A> => ((A=>B))
  const curriedMap = curry2(map);
  curriedMap(numbers)(isEven);

  //3).Array의 맵함수 (~> 암시적인 인자 )
  //Array<A>.map ~> (A => B) => Array<B>
  numbers.map(isEven); //인스턴스로서 맵을 호출

  //map_ :: (A=>B) => Array<A> => Array<B>
  const map_ = curry2(flip(map));
  map_(isEven)(numbers); //인자의 순서를 바꿔서

  //isEven :: number => boolean : 숫자입력받고,불린 리턴
  //mapIsEven :: Array<number> => boolean
  // 커링이 되어있는 함수이기때문에 인자를 하나만넣어도됌 numbers 필요없음
  const mapIsEven = map_(isEven);

  isEven(42);
  isEven(7);
  mapIsEven(numbers);
  mapIsEven([]);
  mapIsEven([42]);
  // 함수를 합성해서쓰면 위력은 배가될것.

  const omap = curry2(flip(O.map));
  const optionIsEven = omap(isEven);
  // option에 동작하는 isEven함수
  optionIsEven(O.some(42));
  optionIsEven(O.none());

  //부수효과를 찾아내고, 이것을분리해서 공통적인 방법으로 추상화를 하는 두번째 목적
  //커링된 Map 함수덕분에 순순한 함수를 서로다른 부수효과를 다룰수있어  다양한 부수효과를 범용적으로 다룰 수 있다.
};
