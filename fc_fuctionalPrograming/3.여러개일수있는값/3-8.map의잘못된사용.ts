import { Item, cart } from "./cart";

//품절안된아이템
const stockItem = (item: Item): string => `
    <li>
        <h2>${item.name}</h2>
        <div>가격: ${item.price}원</div>
        <div>수량 : ${item.quantity}상자</div>
    </li>
`;
//품절처리
const outOfStockItem = (item: Item): string => `
    <li class="gray">
        <h2>${item.name} 품절</h2>
        <div class="strike">가격: ${item.price}원</div>
        <div class="strike">수량 : ${item.quantity}상자</div>
    </li>
`;

//재고여부에 따라서 어떤모습으로 그릴지 결정하는 함수
const item = (item: Item): string => {
  if (item.outOfStock) {
    return outOfStockItem(item);
  } else {
    return stockItem(item);
  }
};

const totalCalculator = (
  list: Array<Item>,
  getValue: (item: Item) => number
): number => {
  const result: Array<number> = [];
  list.forEach(function (item) {
    if (item.outOfStock === false) {
      result.push(getValue(item));
    }
  });
  return result.reduce((total, value) => total + value);
}; //이부분은 함수의 합성으로도 합성이 안된다.
//더이상 함수를 합성할수없고 코드를 이어서 작성하는것이 불가
//map은 부수효과를 일으키는 함수

//for if문을 공통화시켜 리팩토링함
const totalCount = (list: Array<Item>): string => {
  const totalCount = totalCalculator(list, (item) => item.quantity);
  return `<h2>전체수량 : ${totalCount}상자</h2>`;
};
const totalPrice = (list: Array<Item>): string => {
  const totalPrice = totalCalculator(
    list,
    (item) => item.price * item.quantity
  );
  return `<h2>전체가격 : ${totalPrice}원</h2>`;
};

const list = (list: Array<Item>) => {
  //let html = "<ul>";

  //상품들이 하나씩 들어가서 품절인지 아닌지 분기한후 HTML그려줌
  // for (let i = 0; i < list.length; i++) {
  //   html += item(list[i]);
  // }
  // html += "</ul>";

  //리팩토링
  return `
  <ul>
    ${list
      //1. 목록에 있는 아이템을 태그로 변경
      .map(item)
      //2. 태그의 목록을 모두 하나의 문자열로 연결
      .reduce((tags, tag) => tags + tag, "")}
  </ul>
  `;
};
const app = document.getElementById("app");
if (app !== null) {
  app.innerHTML = `
    <h1>장바구니</h1>
    ${list(cart)}
    ${totalCount(cart)}
    ${totalPrice(cart)}  
  `;
}
