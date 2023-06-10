/*
토마토 7000원
오렌지 15000원
사과 10000원
*/
export let totalPrice = 0;
// totalPrice += 7000;
// totalPrice += 15000;
// totalPrice += 10000;
// totalPrice += 30000;

//실수를 줄이고 재사용성을 높이기위해 가격을 더해주는 부분을 별도에 함수로

//명령형으로
function addTomato() {
  totalPrice += 7000;
}
function addOrange() {
  totalPrice += 15000;
}
function addApple() {
  totalPrice += 10000;
}
function list1() {
  //모듬
  addTomato();
  addOrange();
  addApple();
}
function list3() {
  //토마토 100상자라면?
  addTomato();
  addTomato();
  addTomato();
  addTomato();
  addTomato();
  //정말 100번이 맞는지 실수하게됨
}

//addTomato 100번 호출
//계산을 어떻게 해야할것인지 초점
//명령형프로그래밍
function list3_refactor(n: number) {
  for (let i = 0; i < n; i++) {
    addTomato();
  }
}
//list3_refactor(100);
//console.log(totalPrice);

//부수효과의 사례

//문자열 변경했는데 가격이 변경됨
//핫모듈 익스플레이먼트에 의해 변경된것만 런타임에 반영하는구조에서는,
//index.ts파일이 변경되면 함수전체가 재실행
//index 안에 있는 main 함수가 실행은 되었는데, 파일전체가 재실행된것은 아니기 때문에
//전역변수가 초기화될 기회를 얻지 못하고 이전값이 계속남아있어 남아있는 문제

//이게바로 부수효과를 이해하기 어려운 사례
//전역변수라는 부수효과가 다루기 어렵고 까다롭다라는것만 알아두면 된다.
