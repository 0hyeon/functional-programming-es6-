import * as T from "../try";
// 명령형 vs 선언형

const KeepSuccessWithFor = <E, R>(tas: Array<T.Try<E, R>>): Array<R> => {
  const ret: Array<R> = [];
  for (const ta of tas) {
    if (T.isSuccess(ta)) ret.push(ta.result);
    //루프안에서 값을 리턴하면 안되기 때문에 값을 중심으로 사고하기가 어렵게 되고 성공했을때
    //어떤 동작을 해야하는지 명령적인 방식으로 사고하게 된다
  }
  return ret;
};

const KeepSuccess = <E, R>(tas: Array<T.Try<E, R>>): Array<R> => {
  const ret = tas.flatMap((ta) => {
    if (T.isSuccess(ta)) return [ta.result];
    //값이 무엇이 되어야하는가 => 선언적 사고
    else return []; //실패시 빈배열
  });
  return ret;
};
//어느것이 더 낫다가 아니다 함수형에는 선언적 방식의 사고를 장려
//프로그램을 선언적인 방식으로 작성하기위해 try option 같은 모든함수가 필요하지 x
//중요한건 부수효과가 어떤것인지 파악하고 격리하는 방법에 아이디어만 있다면, 이런방식의 코드작성이 얼마든지 가능하다는것을 강조

//try의 flatMap해보자

//map이라는 함수가 Array뿐만아니라 try나 option에도 있는것을 알면 이해가 쉬울것

//flatMap :: (A=> Array<B>) => (Array<A> => Array<B>)
//map     :: (A=> B)        => (Array<A> => Array<B>)

//Array - flat :: Array<Array<A>> => Array<A>

//Try - flat   :: Try<E,Try<A>> => Try<E,A>
const flat = <E, A>(tta: T.Try<E, T.Try<E, A>>): T.Try<E, A> => {
  if (T.isSuccess(tta)) return tta.result;
  return tta; //중첩돼있지만 타입이다른데 어떻게 되는건지 ? 혼돈이 당연
}; //T.Try<E>가 같다는것에 중점을 둬한다.
//성공했을때는 결과에있는 Try를사용해서 다음계산에 성공과 실패여부를 실행해볼수있지만 실패했을때는 에러만 남기때문에 다음실행이 중단되는걸 알수 있다.
const flatMap = <E, A, B>(
  ta: T.Try<E, A>,
  f: (a: A) => T.Try<E, B>
): T.Try<E, B> => {
  return flat(T.map(ta, f));
};
