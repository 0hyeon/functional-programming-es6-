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

//성공했을때만 실행 실패했을땐
export const map = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
  if (isFailed(ta)) return ta;
  return success(f(ta.result));
};

//Array<T.Try<ParsedError,ParsedItem>> => Array<ParsedItem>
//성공한 값만 남겨야 하기 때문에 keepsuccess라고 지어보자
//특정타입에만 동작할필요는 없기때문에 에러,성공을 제네릭으로 만든다
export const KeepSuccess = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
  //배열을 배열로 구현한것이니 Array에 map을 고려해볼수도있다. 그러나,
  //map의 구조분해 성질때문에 문제가 있다. 에러일때는 undifined를 리턴하기때문에 문제
  //flatmap은 map과 타입이 유사하지만 인자로받는 값을 배열을 리턴
  //1.맵함수가 배열을 리턴하도록 만들기
  //2.실패시 빈배열
  const ret = tas.flatMap((ta) => {
    if (isSuccess(ta)) return [ta.result];
    //값이 무엇이 되어야하는가 => 선언적 사고
    else return []; //실패시 빈배열
  });
  return ret;
};
//flatMap :: (A=> Array<B>) => (Array<A> => Array<B>)
//map     :: (A=> B)        => (Array<A> => Array<B>)

// 명령형 vs 선언형
export const KeepSuccessWithFor = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
  const ret: Array<R> = [];
  for (const ta of tas) {
    if (isSuccess(ta)) ret.push(ta.result); //값누적변수
  }
  return ret;
};
