import { create } from "zustand";
import type { Filter, TodoData } from "../types/todo";
import { loadTodos, TODO_ZUSTAND_STORAGE_KEY } from "../services/todoStorage";

type TodoZustandStore = {
    todos: TodoData[];
    filter: Filter;
    editingId: number | null;
    tempText: string;
    addTodo: (text: string) => void;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    setFilter: (filter: Filter) => void;
    startEdit: (item: TodoData) => void;
    setTempText: (text: string) => void;
    saveEdit: () => void;
    cancelEdit: () => void;
};

export const useTodoZustandStore = create<TodoZustandStore>((set) => ({
    todos: loadTodos(TODO_ZUSTAND_STORAGE_KEY),
    filter: "all",
    editingId: null,
    tempText: "",

    addTodo: (text) =>
        set((state) => {
            const trimmedText = text.trim();
            if (!trimmedText) return state;

            const newTodo: TodoData = {
                id: Date.now(),
                text: trimmedText,
                done: false
            };

            return { todos: [...state.todos, newTodo] };
        }),

    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id)
        })),

    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        })),

    setFilter: (filter) => set({ filter }),

    startEdit: (item) =>
        set({
            editingId: item.id,
            tempText: item.text
        }),

    setTempText: (text) => set({ tempText: text }),

    saveEdit: () =>
        set((state) => {
            const newText = state.tempText.trim();
            if (!newText) return state;

            return {
                todos: state.todos.map((todo) =>
                    todo.id === state.editingId ? { ...todo, text: newText } : todo
                ),
                editingId: null,
                tempText: ""
            };
        }),

    cancelEdit: () =>
        set({
            editingId: null,
            tempText: ""
        })
}));
