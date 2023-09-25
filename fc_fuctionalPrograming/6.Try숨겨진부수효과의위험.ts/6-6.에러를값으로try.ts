//TODO:1 지난시간에 OPTION이라는 값이있으면 SOME 없으면 NONE

//에러를 값으로 다루는 TRY구현
//에러를 값으로 다루는건 => 계산에 성공하거나 실패할수도 있다는것을 의미
// TRY도 Todo1처럼 대소형자료구조 처럼 구현해보자

type Success<R> = {
  readonly _tag: "success";
  readonly result: R;
};

type Failed<E> = {
  readonly _tag: "failed";
  readonly error: E;
};

console.clear();

export type Try<E, R> = Failed<E> | Success<R>;

//평범한값을 성공이나 실패로 나타내주는 함수로 만들어보자 이러한 함수가 없으면 _tag를 일일이 써줘야해서 번거로워서 만듦
export const success = <R>(result: R): Try<never, R> => ({
  //사용하지 않는 타입은 never로
  _tag: "success",
  result,
});

export const failed = <E>(error: E): Try<E, never> => ({
  //사용하지 않는 타입은 never로
  _tag: "failed",
  error,
});

//구체적인 타입들을 알야야할 필요가 있을때만 사용하는 함수를 만들어보자
//공변성, 반공변성 이런게 있다.
export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> =>
  ta._tag === "success";

export const isFailed = <E>(ta: Try<E, unknown>): ta is Failed<E> =>
  ta._tag === "failed";

export const getOrElse = <E, R>(
  ta: Try<E, R>,
  defaultValue: (e: E) => R
): R => {
  //에러가 있을 경우 에러에 기반하여 기본 값을 결정한다.
  //defaultValue을 고정된값을 사용하지않고,
  //error 타입의 값을 사용하면 활용도가 더 높을것이다.
  if (isFailed(ta)) return defaultValue(ta.error);
  return ta.result;

  //다음시간은 언제옵션을 쓰고 언제 try를 써야하는지 알아보자
};
