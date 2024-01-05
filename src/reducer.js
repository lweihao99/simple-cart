const reducer = (state, action) => {
  // 接受 state 当前状态，action要做的也就是描述状态变化的对象
  // 这里可以进行一系列的判断，根据不同的 action.type 执行不同的逻辑

  switch (action.type) {
    case "CLEAR_CART": {
      return { ...state, cart: [] }; // 原先的state属性不动，改变cart数据为空数组，action为CLEAR_CART就清空购物车
    }

    case "REMOVE": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }; // 移除指定id数据
    }

    // 数量控制，如果小于1则移除物品
    case "TOGGLE_AMOUNT": {
      const updateCart = state.cart
        .map((item) => {
          if (action.payload.id === item.id) {
            if (action.payload.type === "increase") {
              return { ...item, amount: item.amount + 1 };
            }
            if (action.payload.type === "decrease") {
              return { ...item, amount: item.amount - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return { ...state, cart: updateCart };
    }

    case "GET_TOTALS": {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          // cartTotal = accumulator, cartItem = current value
          const { price, amount } = cartItem;
          cartTotal.amount += amount; // 累计到初始值上
          cartTotal.total += price * amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      total = parseFloat(total.toFixed(2)); // 保留两位小数

      return { ...state, total, amount };
    }

    case "LOADING": {
      return { ...state, loading: true };
    }

    case "DISPLAY_ITEMS": {
      return { ...state, cart: action.payload, loading: false };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
