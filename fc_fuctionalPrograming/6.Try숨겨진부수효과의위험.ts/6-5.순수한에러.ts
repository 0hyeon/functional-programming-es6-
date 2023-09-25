//참조투명성 : 그것을 평가한 값으로 대체해도 프로그램의 동작변화하지 않는다.

const tenDivideBy = (n: number): number => {
  //실습을위한 10을 n으로 나누는 함수
  if (n === 0) {
    throw new Error("0으로 나눌 수 없습니다 .");
  }
  return 10 / n;
};

// const test2 = (n:number):number => {//TODO:이렇게해도되지 않나요
//   try {
//     return tenDivideBy(0);
//   } catch(e){
//     return 1
//   }
// }

// 리턴타입만으로는 예외를 발생하는 함수인지 아닌지 알수없다.
// 타입만으로 예외를 발생하는지 알수가 없어 별도의 예외를 분석하는 방법밖에없다
// 이렇게 throw Error를 던지는 대신 명시적인 값으로 돌려주는 방법이 있다.
// try catch는 아직 참조가 투명하지않다.

const test = () => {
  // const y = tenDivideBy(0);
  // => 예외가 발생하는 코드는 try블럭 바깥에 있으면 알수없다. =>참조가 투명한지 아닌지 모른다.
  // TODO:에러를 명시적인 값으로 리턴하는 방법에 대해서 다음시간에 알아보자
  try {
    const y = tenDivideBy(0);
    return y;
  } catch (e) {
    return 1;
  }
};

const main = () => {
  const x = test();
  console.log(x);
  console.log("프로그램이 종료되었습니다.");
};
