import type { TodoData } from "../types/todo";

const TODO_STORAGE_KEY = "todos";

function loadTodos():TodoData[]{
    const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos(todos:TodoData[]):void{
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

export { loadTodos, saveTodos };