//把 todo 这块状态注册到全局
// 它通常只做三件事：
// 导入 configureStore
// 导入 todoSlice 导出的 reducer
// 调用 configureStore({ reducer: { ... } })
// 你最后还要顺手导出两个类型：
// RootState
// AppDispatch
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../store/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer
  }
});

// RootState：整个Redux数据长什么样子
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch：可以往Redux发什么指令
export type AppDispatch = typeof store.dispatch;