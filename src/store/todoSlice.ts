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
    editingId: number | null;
    tempText: string;
};

const initialState: TodoState = {
    todos: [],
    filter: "all",
    editingId: null,
    tempText: ""
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
        },
        startEdit: (state, action: PayloadAction<TodoData>) => {
            state.editingId = action.payload.id;
            state.tempText = action.payload.text;
        },
        setTempText: (state, action: PayloadAction<string>) => {
            state.tempText = action.payload;
        },
        saveEdit: (state) => {
            const newText = state.tempText.trim();
            if (newText === "") {
                alert("Todo text cannot be empty.");
                return;
            }

            const todo = state.todos.find(t => t.id === state.editingId);
            if (todo) {
                todo.text = newText;
            }

            state.editingId = null;
            state.tempText = "";
        },
        cancelEdit: (state) => {
            state.editingId = null;
            state.tempText = "";
        }
    }
});

export const { addTodo, removeTodo, toggleTodo, setFilter, startEdit, setTempText, saveEdit, cancelEdit } = todoSlice.actions;
export default todoSlice.reducer;