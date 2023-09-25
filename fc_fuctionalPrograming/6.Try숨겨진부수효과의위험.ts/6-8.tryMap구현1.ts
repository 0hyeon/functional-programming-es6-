// 아이템 유효한지 검증하는 함수
import { Item, cart } from "../cart";
const validateItem = (item: Item) => {
  if (item.quantity > 1) {
    throw new Error("1개이상이어야");
  } else if (item.quantity > 10) {
    throw new Error("한번에 10개이상 초과구매 못한다");
  }
};

// const renderItem =
