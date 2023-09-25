//try catch는 명령형코드로 부수효과에 해당함

const tenDivideBy = (n: number): number => {
  if (n === 0) {
    throw new Error("0으로 나눌 수 없습니다 .");
  }
  return 10 / n;
};
//tenDivdeBy는 어떤 기능이.?
const test = () => {
  try {
    const y = tenDivideBy(0);
  } catch (e) {
    return 1;
  }
};
//test는 왜할까.?
const main = () => {
  const x = test();
  console.log(x);
  console.log("프로그램이 종료되었습니다.");
};
