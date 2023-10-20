//쓰는 목적 :
//1. if문의 쓰임이 조건이 다양하기 때문에 어떤 조건을 어떻게 처리하는지 파악하려면 이것이 사용된
//맥락도 같이 고려하기위해
//2. 값의 부재를 확인하는 용도에 맞게 부수적인 맥락을 파악하기위해 덜신경써도됨
//3. 명력적인 코드는 합성해서 사용하기 까다롭기 때문에
//4. 추상화된 부수효과를 단일인터페이스를 사용하면 서로다른 부수효과라더라도 통일된 방식으로 코드를 작성할 수 있다

//명력적인 서로다른 부수효과라도
//제네릭과 유니언으로, 값이 있을수도, 없을수도 있는 자료구조.

// export type Option<A> = A | undefined;
//위에코드는 undefined가 워낙 여러 맥락으로 사용되고 있어 또다른 혼란이 야기되기도
//다음은 조금 다른방법

//값이 있을때와 없을때 각각의 타입으로 해보자
//Some타입은 값이 있어야하기 때문에 제네릭을 사용해서 값이 가질수있도록

//값이있을때
export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A; //제네릭을 이용해서 값을 하나 가질수있도록 해주자.
};
//값이없을때
export type None = {
  readonly _tag: "None";
};
//각각 타입의 무엇인지 알기위해tag를 달아준다.
//옵션타입을 some과 none의 유니온타입으로
export type Option<A> = Some<A> | None;

//옵션의 값을 만들려면 태그의값을 일일이 적어야 해서 불편한데요.
const n1: Option<number> = { _tag: "Some", value: 1 };

//값을 조금더 쉽게만들기위해 some none을 만들어본다.
//A와 유니온에 undefined를 사용하는대신 굳이이렇게 사용하는이유는 타입을 정확하게하기위해

// export const some2 = <A>(value: A): Option<A> => { _tag: "Some", value } //객체를 반환하지 않고 return을 반환할때 객체만 감싼다, 외부 범위의 변수나 상태를 참조거하거나 수정할때 클로저를 형성하고 외부변수에 접근하게할때 객체만
export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value }); //새로운 객체를 생성하고 반환
export const none = (): Option<never> => ({ _tag: "None" }); //함수가 아무것도 반환하지않을때 None을 사용

//주어진 Option타입의 값이 Some타입인지 None타입인지 알게만드는것도 중요
//타입을 식별하는 태그필드를 사용해서 Some타입인지 확인한다.
//some타입인지 알아보는 함수작성
export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some";
export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === "None";
//some 및 none 함수는 Option 타입과 관련이 있으며, 성공과 실패를 나타내는 두 가지 가능한 값인 Some 및 None 객체를 생성하고 반환합니다. 반면, isSome 및 isNone 함수는 주어진 Option 객체가 Some 또는 None인지 확인하는 함수입니다.

// 이런식으로 사용
// const optionDiscountPrice = fromUndefined(item.discountPrice); //값의부재를파악 some(a) | none을 반환
// const discountPrice = getOrElse(optionDiscountPrice, 0); //값이없다면 default값
// let saleText = "";
// // let discountPrice = 0;
// if (isSome(optionDiscountPrice)) {
//   //응용해서 다른값을 만들기 때문에 getOrElse로 구현 할수없다.
//   saleText = `${optionDiscountPrice}원 할인`;
// }

//옵션을 사용하기위한 기본준비를 마쳤다.

//if문은 어떤 조건에 어떤맥락으로 사용하는지에 따라 값의부재를 사용하는 용도에 맞게 타입에맞게
//부수적인 맥락을 파악하기 위해 덜신경써도 된다.
//값의 부재를 확인하는 용도를 사용할땐 추상화된 부수효과를 타입으로 정할때
//Option으로 값의부재를 나타내는 함수: undefined아니면 some

export const fromUndefined = <A>(a: A | undefined): Option<A> => {
  if (a === undefined) return none();
  return some(a);
};

//예를들면 O.getOrElse(optionDiscountPrice, 0); 0이 값이없을때 디폴트값
export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
  //값이 없으면 지정된 값을 사용하고
  if (isNone(oa)) return defaultValue;
  //값이있다면 해당값을 사용
  return oa.value;
};

//값이 없으면, None을 retrun 값이 있으면 값에 함수를 적용한후 다시 Option으로 만들어서 돌려주는 함수
//None과 Some으로 함수로 적용할 값이 있어야하는데,
//None은 값이 없기때문에 함수를 호출하지않고 그대로
//Option의 타입이 Some인경우에만 값이있을때만 Some안에있는 값의 함수를 적용
//
export const map = <A, B>(oa: Option<A>, f: (a: A) => B): Option<B> => {
  //값이 없으면 값이 없는 상태를 유지한다.
  if (isNone(oa)) return oa;
  //값이 있으면 값을 함수에 적용한다.
  //특정타입을 옵션으로 만드는 함수를 만들었기 때문에
  //some을 감싸서
  return some(f(oa.value));
};
// const optionDiscountPrice = O.fromUndefined(item.discountPrice);
// const discountPrice = O.getOrElse(optionDiscountPrice, 0);
// O.map(
//   optionDiscountPrice,
//   (discountPrice) => `${discountPrice} 원 할인`
// );

export const mapOrElse = <A, B>(
  oa: Option<A>,
  f: (a: A) => B,
  defaultValue: B
): B => {
  return getOrElse(map(oa, f), defaultValue);
};
