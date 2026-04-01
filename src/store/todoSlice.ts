// 负责：定义 todo 状态长什么样，以及允许怎么改
// 这里是 Redux Toolkit 的核心。
// 它需要：
// initialState
// reducers
// 导出 action
// 导出 reducer
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TodoData, Filter } from "../types/todo";

type TodoState = {
    todos: TodoData[];
    filter: Filter;
};

const initialState: TodoState = {
    todos: [],
    filter: "all"
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const text = action.payload.trim();
            if (!text) return;
            state.todos.push({
            id: Date.now(),
            text,
            done: false,
            });
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.done = !todo.done;
            }
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload;
        }
        
    }
});

export const { addTodo, removeTodo, toggleTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;