//값이 있을수도, 없을수도 있는 자료구조.

// export type Option<A> = A | undefined;
//위에코드는 undefined가 워낙 여러 맥락으로 사용되고 있어 또다른 혼란이 야기되기도
//다음은 조금 다른방법

//값이 있을때와 없을때 각각의 타입으로 해보자
//Some타입은 값이 있어야하기 때문에 제네릭을 사용해서 값이 가질수있도록

export type Some<A> = {
  //값이 있을때
  //값의변경을 허용하고 있지 않기때문에 readOnly
  readonly _tag: "Some";
  readonly value: A;
};
export type None = {
  //값이 없을때
  readonly _tag: "None";
};

//이것은 태그드 유니언을 흉내 알제브라이트 타입을 ADT 대수자료구조에서의 합타입
//스위프트 코틀릭 러스트 에서 지원

//옵션타입을 some과 none의 유니온타입으로
export type Option<A> = Some<A> | None; //값이 있거나 없거나
// 2.export type Option<A> = A | undefined;
//두번째 코드보다 나은이유는 undefined가 다른맥락으로 사용될수있어 undefined를 사용하지 않고 타입을 지정할수 있기 때문

//옵션의 값을 만들려면 태그의값을 일일이 적어야 해서 불편한데요.
const n1: Option<number> = { _tag: "Some", value: 1 };

//값을 조금더 쉽게만들기위해 some none을 만들어본다.
//A와 유니온에 undefined를 사용하는대신 굳이이렇게 사용하는이유는 타입을 정확하게하기위해

//some함수를 사용하면 {_tag}를 따로 넣어주지 않아도 되기때문에 사용
export const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });
export const none = (): Option<never> => ({ _tag: "None" });
//주어진 Option타입의 값이 Some타입인지 None타입인지 알게만들자.
//타입을 식별하는 태그필드를 사용해서 Some타입인지 확인한다.

//타입이 SOME인지 NONE인지 확인하는 함수가 필요
//타입을 식별하는 태그필드를 사용해서 Some타입인지 확인한다.
export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === "Some";
export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === "None";
//옵션을 사용하기위한 기본준비를 마쳐봄

//??왜 some타입과 none함수를 만들었는데 isSome과 isNone을 다시 만들었는지.

//some과 none은
//isSome / isNone은 some과 none을 활요하기 위해
