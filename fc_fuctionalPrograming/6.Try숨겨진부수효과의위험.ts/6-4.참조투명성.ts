try {
} catch (error) {}

// try catch는 순수함수도 아니고, 함수합성이 어렵다 : 참조투명성때문

// 참조투명성: 표현식을 그것을 평가한 값으로 대체해도 표현이 항상 동일해야하고 부수효과 없어야한다.

// 표현식 은 구문의 일종 (expression) if ,for문의 일종 => 독립적으로 표현이 가능
// 독립적으로 실행이가능한 코드의 조각

// 실행이 되고나면 어떤값으로 치환이가능 이값을 표현식 4 + (7 * 8)이라 한다.

// 참조에 불투명한 경우
let n = 0;
n = n + 1; //n:1
n = n + 1; //n:2
//n의 값이 statement 실행마다 변경되고 있다.

// 부수효과가 없는 평가식(함수)의 사용의 예
const getPrice = (name: string): number => {
  //TODO: check
  console.log(`${name}의 가격을 조회`);

  if (name === "tmt") {
    return 7000;
  } else if (name === "orange") {
    return 15000;
  } else if (name === "apple") {
    return 10000;
  } else {
    throw new Error(`Unknown fruit: ${name}`);
  }
};
const priceOfApple = getPrice("apple");

console.log(priceOfApple + priceOfApple); //결과나 동작이 변함이 없다

//콘솔로그와 TODO:check가 추가된다면, (부수효과) 프로그램의 동작이 변경 (로그횟수가 달라짐)
console.log(priceOfApple + priceOfApple); //프로그램의 동작에 영향을 미침 이외, 전역변수 변경하거나  클래스멤버를 변경하는 메서드등 의 경우 주의를 기울여야한다.
//표현식이 참조에 투명하다면 반복식이 참조에 치환하여도 아무리 복잡한 코드여도 안심하고 리팩토링을 (함수합성도포함)할 수 있다.
