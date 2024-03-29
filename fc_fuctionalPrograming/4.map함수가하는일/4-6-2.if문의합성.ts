//값이 부재일경우 비슷한 코드 반복을 리팩토링
//if는 null undifined 뿐만아니라 참거짓을 판별
//if문이 어떻게 사용된 맥락을 보려면 같이고려해봐야할이다
//부수적인 맥락을 파악하려면 type을 신경써야
import { cart, Item } from "../3.여러개일수있는값/cart";
import * as O from "./4-6-1.if문의합성";
const stockItem = (item: Item): string => {
  const optionDiscountPrice = O.fromUndefined(item.discountPrice); //값의부재를파악 some(a) | none을 반환
  const discountPrice = O.getOrElse(optionDiscountPrice, 0); //값이없다면 default값
  let saleText = "";
  // let discountPrice = 0;
  if (O.isSome(optionDiscountPrice)) {
    //응용해서 다른값을 만들기 때문에 getOrElse로 구현 할수없다.
    saleText = `${optionDiscountPrice}원 할인`;
  }
  return `
        <li>
            <h2>${item.name}</h2>
            <div>가격: ${item.price - discountPrice}원 ${saleText}</div>
            <div>수량: ${item.quantity}</div>
        </li>
    `;
};
const outOfStockItem = (item: Item): string => `
    <li class="gray">
        <h2>${item.name} (품절)</h2>
        <div class="strike">가격: ${item.price}원</div>
        <div class="strike">수량 : ${item.quantity}상자</div>
    </li>
`;
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
  return list
    .filter((item) => item.outOfStock === false)
    .map(getValue)
    .reduce((total, value) => total + value, 0);
};

const totalCount = (list: Array<Item>): string => {
  const totalCount = totalCalculator(list, (item) => item.quantity);
  return `<h2>전체수량 : ${totalCount}상자</h2>`;
};
const totalPrice = (list: Array<Item>): string => {
  const totalPrice = totalCalculator(
    list,
    (item) => item.price * item.quantity
  );

  const totalDiscountPrice = totalCalculator(list, (item) => {
    //item.discountPrice /> O.fromundefined($) /> O.getOrElse($,0) 파이프라인 함수합성
    let discountPrice = O.getOrElse(O.fromUndefined(item.discountPrice), 0);
    if (item.discountPrice !== undefined) {
      discountPrice = item.discountPrice;
    }
    return discountPrice * item.quantity;
  });
  return `<h2>전체가격 : ${
    totalPrice - totalDiscountPrice
  }원 (총${totalDiscountPrice}원 할인)</h2>`;
};

const list = (list: Array<Item>) => {
  return `
    <ul>
      ${list.map(item).reduce((tags, tag) => tags + tag, "")}
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
