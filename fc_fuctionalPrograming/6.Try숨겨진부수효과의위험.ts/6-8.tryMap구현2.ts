import * as O from "../option";
import * as T from "../try";
import { Item, cart } from "../cart";

//아이템의 배열을 ParsedItem 리턴타입의 배열로 변환
type ArrayItem = Array<T.Try<ParseError, ParsedItem>>;
const validateItem = (item: Item) => {
  if (item.quantity > 1) {
    throw new Error("1개이상이어야");
  } else if (item.quantity > 10) {
    throw new Error("한번에 10개이상 초과구매 못한다");
  }
};
type ParsedItem = { _tag: "parsedItem" } & Item;
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
// totalCalculator list에 KeepSuccess를 사용한것만으로 에러가 해결
const totalCalculator = (
  list: ArrayItem,
  getValue: (item: ParsedItem) => number
): number => {
  //Array<T.Try<ParsedError,ParsedItem>> => Array<ParsedItem>

  //인자를 명시적으로 사용하도록 코드를 수정,  KeepSuccess를 사용한것만으로 에러가 해결 (undifined시 빈배열 반환 )

  // return list 원래는 이거
  return T.KeepSuccess(list)
    .filter((item) => {
      try {
        parseItem(item);
        return item.outOfStock === false;
      } catch (error) {
        return false;
      }
    })
    .map(getValue)
    .reduce((total, value) => total + value, 0);
};
const totalCount = (list: ArrayItem): string => {
  const totalCount = totalCalculator(list, (item) => item.quantity);
  return `<h2>전체수량 : ${totalCount}상자</h2>`;
};
const totalPrice = (list: ArrayItem): string => {
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
const list = (list: ArrayItem) => {
  return `
      <ul>
        ${list
          //코드를 명시적으로 수정해보자
          //try의 map을 사용했기때문에

          ////1.목록에 있는 모든 아이템을 태그로 변경
          // .map(renderItem) 에러를 조금 보기쉽도록 인자를 명시적으로 사용하도록 코드를 수정

          ///2.태그의 목록을 모두 하나의 문자열로 연결
          // .map((item) => renderItem(item)) //renderItem의 인자로 Try의 ParsedItem이 전달돼야하는데,item은 try의 값이라서 안됨

          //3.try의 map을 사용하면 이를 해결가능
          .map((item) =>
            T.getOrElse(
              //파싱이 실패하면 getOrElse로 에러 호출
              T.map(item, (parsedItem) => renderItem(parsedItem)),
              errorItem //에러메시지호출
            )
          )
          .reduce((tags, tag) => tags + tag, "")}
      </ul>
      `;
};
// 파싱이 성공된 상품만 렌더되도록
const renderItem = (item: ParsedItem): string => {
  try {
    const parsedItem = parseItem(item);
    const render = T.map(parsedItem, (item) => {
      if (item.outOfStock) {
        return outOfStockItem(item);
      } else {
        return stockItem(item);
      }
    });
    return T.getOrElse(render, errorItem);
  } catch (e) {
    return `<li>${e}</li>`;
  }
};
const render = (cart: ArrayItem) => {
  // O.map(O.fromNull(document.getElementById("app")), (app) => {
  //   app.innerHTML = `
  //   <h1>장바구니</h1>
  //   ${list(cart)}
  //   ${totalCount(cart)}
  //   ${totalPrice(cart)}
  //   `;
  // });
};

export const main = () => {
  render(cart.map(parseItem));
};
//지금까지 리팩토링 정리
//1.프로그래밍 동작하는 초기시점에 데이터를 검증 const main함수에 cart.map(parseItem)

//2.검증한 정보가 포함될수있는 타입을 사용하였고 함수들이 인자의 타입을 여기에 맞춰 성공이나 실패 또는
//에러정보만 다룰수있도록 최대한 정교하게 수정

//3.컴파일러의 안내에 따라서 필요한 함수를 찾아서 만들기도 하면서 에러를 수정

//4.부수효과보다는 값으로 다루어져 예측을 하기쉽고 버그가 발생하더라도 나와도 원인 파악이 쉽다.
//try catch를 사용하며 validation을 사용하는 방식으로 이것의  불편한점을 알아보았고,
//파싱과 트라이타입을 사용해 파싱이 어떤 장점이 있는지 알아보았다

//다음시간엔 KeepSuccess를 flatMap을 사용하지않고 for loop를 사욯해보도록 하겠음
