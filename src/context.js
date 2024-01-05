import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
import { type } from "@testing-library/user-event/dist/type";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext(); // 创建一个react上下文对象,包装AppProvider组件

// 初始值
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // state 将被设置为初始值,dispath 用于来向reducer发送action，从而触发状态更新

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  // const increase = (id) => {
  //   dispatch({ type: "INCREASE", payload: id });
  // };

  // const decrease = (id) => {
  //   dispatch({ type: "DECREASE", payload: id });
  // };

  // 每次cart属性变化就更新
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  // fetch data
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(url);
    const cart = await res.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  // 只fetch一次
  useEffect(() => {
    fetchData();
  }, []);

  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  // 使用provider包装应用程序，将购物车状态提供给应用中的所有组件
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// 通过自定义hook将上下文的值提供给组件使用
export const useGlobalContext = () => {
  return useContext(AppContext); // 使组件能够访问AppProvider提供的上下文
};

export { AppContext, AppProvider };
