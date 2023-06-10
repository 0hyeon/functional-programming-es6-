import { cart } from "./cart";

const list = () => {
  let html = "";
  let totalCount = 0;
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    html = `
        <li>
            <h2>${cart[i].name}</h2>
            <div>가격 : ${cart[i].price}원</div>
            <div>수량 : ${cart[i].quantity}상자</div>
        </li>
    `;
    totalCount += cart[i].quantity;
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return `
    <ul>
        ${html}
    </ul>
  `;
};

/* 총가격 */
let totalPrice = 0;
for (let i = 0; i < cart.length; i++) {
  totalPrice += cart[i].price * cart[i].quantity;
}
