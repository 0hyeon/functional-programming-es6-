import { Item, cart } from "../cart";

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
//인자로 받지 않으면 순수함수로 보기 어렵다
//전역변수인 cart가 전역적으로 주어지지않으면,
//임의의 목록에 대한 테스트와 별도의 파일에 모듈로 분류하고싶어도 어렵다.

//고차함수를 이용하여 for,if문이용해 쉽게 분리하여 추상화
// const totalCount = (list: Array<Item>): string => {
//   let totalCount = 0;
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].outOfStock === false) {
//       totalCount += list[i].quantity;
//     }
//   }
//   return `<h2>전체수량 : ${totalCount}상자</h2>`;
// };
// const totalPrice = (list: Array<Item>): string => {
//   let totalPrice = 0;
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].outOfStock === false) {
//       totalPrice += list[i].price * list[i].quantity;
//     }
//   }
//   return `<h2>전체가격 : ${totalPrice}원</h2>`;
// };

//for if 공통부분 getValue라는 함수를 받아
const totalCalculator = (
  list: Array<Item>,
  getValue: (item: Item) => number
): number => {
  // let total = 0;
  // for (let i = 0; i < list.length; i++) {
  //   if (list[i].outOfStock === false) {
  //     // total += list[i].quantity; 이부분에서 quantity를 가져오는 부분을 함수로 만들어준다.
  //     total += getValue(list[i]); //total에 숫자를 리턴해야하기 때문에, item을 입력받고 number를 리턴
  //   }
  // }
  // return total;
  //
  //리팩토링
  //전체목록중 재고가 있는 상품만 getValue를 실행하고 그값을 모두 더한다.
  return (
    list
      //1. 재고가 있는 상품만 분류하기
      .filter((item) => item.outOfStock === false)
      //2.분류된 상품들에 대해서 getValue실행하기
      .map(getValue)
      //3.getValue가 실행된값 모두 더하기
      .reduce((total, value) => total + value, 0)
  );
  //map,filter,reduce
};

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
