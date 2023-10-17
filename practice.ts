type Some<A> = {
  readonly _tag: "Some";
  readonly value: A; //제네릭을 이용해서 값을 하나 가질수있도록 해주자.
};
type None = {
  readonly _tag: "None";
};
type Option<A> = Some<A> | None;

//값을 조금더 쉽게만들기위해 some none을 만들어본다.
//A와 유니온에 undefined를 사용하는대신 굳이이렇게 사용하는이유는 타입을 정확하게하기위해
const n1: Option<number> = { _tag: "Some", value: 1 };
const some = <A>(value: A): Option<A> => ({ _tag: "Some", value });
