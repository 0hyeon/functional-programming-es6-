import * as O from "../option";
import * as T from "../try";
import { Item, cart } from "../cart";
// try(parseItem) vs option(validateItem) 비교하기
//갯수의 특별히 제한을 두지 않았는데, 상품구매 수량 너무크거나 마이너스로 가지않도록 제한해보자
//상품의 갯수가 잘못되면 예외가 발생하여 처리하는 로직을 만든다.
//
type ArrayItem = Array<Item>;
const validateItem = (item: Item) => {
  if (item.quantity > 1) {
    throw new Error("1개이상이어야");
  } else if (item.quantity > 10) {
    throw new Error("한번에 10개이상 초과구매 못한다");
  }
};
// 파싱이 성공하더라도 값은 변경하지않고사용, 인터셉션타입사용해서 기존타입을 확장해서 사용
type ParsedItem = { _tag: "parsedItem" } & Item;
//에러가 났을땐 에러와 메시지를 기록
type ParseError = { name: string; message: string };

const parseItem = (item: Item): T.Try<ParseError, ParsedItem> => {
  if (item.quantity < 1) {
    return T.failed({
      name: item.name,
      message: "한개이상의상품",
    });
  } else if (item.quantity > 10) {
    return T.failed({
      name: item.name,
      message: "한번에10개초과x",
    });
  }
  return T.success({
    _tag: "parsedItem",
    ...item,
  });
};
const errorItem = (e: ParseError): string => `
  <li class="red">
      <h2>${e.name}</h2>
      <div">${e.message}</div>
  </li>
  `;
const outOfStockItem = (item: ParsedItem): string => `
      <li class="gray">
          <h2>${item.name} (품절)</h2>
          <div class="strike">가격: ${item.price}원</div>
      </li>
  `;
const stockItem = (item: ParsedItem): string => {
  const optionDiscountPrice = O.fromUndefined(item.discountPrice);
  const discountPrice = O.getOrElse(optionDiscountPrice, 0);
  const saleText = O.mapOrElse(
    optionDiscountPrice,
    (discountPrice) => `${discountPrice}`,
    ""
  );
  return `
      <li>
          <h2>${item.name}</h2>
          <div>${item.price - discountPrice}won ${saleText}</div>
          <div>${item.quantity}</div>
      </li>
  `;
};
const totalCalculator = (
  list: ArrayItem,
  getValue: (item: Item) => number
): number => {
  return list
    .filter((item) => {
      try {
        // validateItem(item); //매번 검증하는 validateItem를 검증하면 판에박힌코드 값이올바른지 검증하지않고 한번만 검사해서 사용하는방법은 없을까? validateItemRefactor
        parseItem(item); //validateItem 대신 이렇게 사용,이경우 또다른 판에박힌 코드를 사용하는게 아닌가 하는 의문이 생길것
        return item.outOfStock === false;
      } catch (error) {
        return false;
      }
    })
    .map(getValue)
    .reduce((total, value) => total + value, 0);
};
const renderItem = (item: Item): string => {
  try {
    const parsedItem = parseItem(item);
    //parsedItem는 try이고 그내부의 파싱된값이 있기때문에 parsedItem변수도 직접넘길수 없다.
    //이럴때필요한게 try map. 값이있을때만 값을 넘기는
    const render = T.map(parsedItem, (item) => {
      if (item.outOfStock) {
        return outOfStockItem(item);
      } else {
        return stockItem(item);
      }
    });
    //성공일땐 reunder를 사용하고 실패일땐 errorItem을 사용한다.
    //getOrElse 실패시 지정된함수사용
    return T.getOrElse(render, errorItem);
  } catch (e) {
    return `<li>${e}</li>`;
  }
};
const render = (cart: ArrayItem) => {};
