let totalPrice = 0;
//이전까지는 totalPrice를 어떻게 계산할건지에 대해 초첨을 맞췄음
//이제부터는 순수함수 위주로 구현하려고함.

function addTomato() {
  return 7000;
}
function addOrange() {
  return 15000;
}
function addApple() {
  return 10000;
}
//계산해서 결과를 리턴함. 이전시간 아무것도 retrun하지 않은것과 대조적

//모듬
function list1() {
  return addTomato() + addOrange() + addApple();
}
//토마토 2상자
function list2() {
  return addTomato() + addTomato();
}
//오렌지 100상자는 더이상 백번 함수호출하지 않아도 괜찮게됨
//index.ts를변경하더라도
function list3() {
  return addTomato() * 100;
}

//출력
function getTotalPrice() {
  return list1();
}
console.log(getTotalPrice());

//과일당 하나의 함수도 나쁘지않지만 함수하나에 해당과일의 가격을 리턴해주는 함수로 만들어줄수도 있다.
function getPrice(name: string) {
  if (name === "tomato") {
    return 7000;
  } else if (name === "orange") {
    return 15000;
  } else if (name === "apple") {
    return 8000;
  }
}

//정의역에 값에 치역을 대입함
const isEven = {
  tomaoto: true,
  orange: true,
  apple: false,
};
//매번 만들어 사용할수가 없어서 함수로 만들어 사용한다
const isEvenFn = (str: string) => str.length % 2 === 0;
//이렇게 함수로 작성하여도 입력값이 출력값에 대응되는 본질은 같다. 함수를 레코드와 비슷하게 씀
