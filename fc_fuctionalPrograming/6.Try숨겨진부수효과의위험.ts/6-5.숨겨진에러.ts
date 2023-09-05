console.clear();

const tenDivideBy = (n: number): number => {
  if (n === 0) {
    throw new Error("0으로 나눌 수 없습니다 .");
  }
  return 10 / n;
};
const test = () => {
  try {
    const y = tenDivideBy(0);
  } catch (e) {
    return 1;
  }
};

const main = () => {
  const x = test();
  console.log(x);
  console.log("프로그램이 종료되었습니다.");
};
