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

const list = () => {
  let html = "<ul>";

  //상품들이 하나씩 들어가서 품절인지 아닌지 분기한후 HTML그려줌
  for (let i = 0; i < cart.length; i++) {
    html += item(cart[i]);
  }
  html += "</ul>";

  let totalCount = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].outOfStock === false) {
      totalCount += cart[i].quantity;
    }
  }
  html += `<h2>전체수량 : ${totalCount}상자</h2>`;

  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].outOfStock === false) {
      totalPrice += cart[i].price * cart[i].quantity;
    }
  }
  html += `<h2>전체가격 : ${totalPrice}상자</h2>`;
};
