// 负责：封装带类型的 useDispatch / useSelector
// 这样你在组件里就能更舒服地用 Redux。
// 它通常会：
// 从 react-redux 导入 useDispatch、useSelector
// 从 store.ts 导入 RootState、AppDispatch
// 导出：
// useAppDispatch
// useAppSelector
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;