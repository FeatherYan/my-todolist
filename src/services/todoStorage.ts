import type { TodoData } from "../types/todo";
export const TODO_USE_STATE_STORAGE_KEY = "todos-use-state";
export const TODO_REDUX_STORAGE_KEY = "todos-redux";
export const TODO_ZUSTAND_STORAGE_KEY = "todos-zustand";
export const TODO_CONTEXT_STORAGE_KEY = "todos-context";
function loadTodos(storageKey: string):TodoData[]{
    const savedTodos = localStorage.getItem(storageKey);
    return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos(storageKey: string, todos:TodoData[]):void{
    localStorage.setItem(storageKey, JSON.stringify(todos));
}

export { loadTodos, saveTodos };