const suits = ["♠️", "♥️ ", "♦️", "♣️"];
const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
//이중포문
const cards: Array<string> = [];
for (const suit of suits) {
  for (const number of numbers) {
    cards.push(suit + number);
  }
}
//map으로 리팩토링

//모든 카드 목록은 아래의 작업이 완료
const cards2 =
  //아래의 작업을 모든 무늬에 적용
  suits.flatMap((suit) =>
    //아래의 작업을 모든숫자에 적용
    numbers.map(
      (number) =>
        //카드는 무늬와 숫자를 연결 한 문자열
        suit + number
        //무늬별로 나누어진 카드를 하나로 합치기
    )
  );

const main = () => {
  const app = document.getElementById("app");
  if (app === null) {
    return;
  }
  app.innerHTML = `
    <h1>cards</h1>
    <pre>
      ${JSON.stringify(cards, null, 2)}
    </pre>
  `;
};
main();
