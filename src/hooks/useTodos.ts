import { useState, useEffect  } from "react";
import type { TodoData, Filter } from "../types/todo";

export function useTodos() {
    // 1. 各种 state
    const [todos, setTodos] = useState<TodoData[]>(() =>{
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempText, setTempText] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    // 2. useEffect 保存 localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // 3. 各种业务函数
    const addTodo = () => {
        if(inputValue.trim() !== "") {
            const newTodo: TodoData = {
                id: Date.now(),
                text: inputValue.trim(),
                    done: false
                };
                setTodos([...todos, newTodo]);
                setInputValue("");
            }
        }
    const deleteTodo = (id: number) => {
        setTodos(todos.filter((item) => item.id !== id));
    }
    const toggleTodo = (id: number) => {
        setTodos(todos.map((item) => item.id === id ? {...item, done: !item.done} : item));
    }
    const startEdit = (item: TodoData) => {
        setEditingId(item.id);
        setTempText(item.text);
    }
    const saveEdit = (id: number) => {
        const newText = tempText.trim();
        
        if(newText === "") {
            alert("Todo text cannot be empty.");
            return;
        }

        setTodos(
            todos.map((item) => 
                item.id === id ? {...item, text: newText} : item
            )
        );

        setEditingId(null);
        setTempText("");
    }
    const cancelEdit = () => {
        setEditingId(null);
        setTempText("");
    }

    
    // 4. filteredTodos
    const filteredTodos = todos.filter((item) => {
        if(filter === "active") return !item.done;
        if(filter === "completed") return item.done;
        return true;
    });

    // 5. return 一个对象，把页面需要的都返回出去
    return {
        inputValue,
        setInputValue,
        editingId,
        tempText,
        setTempText,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        toggleTodo,
        startEdit,
        saveEdit,
        cancelEdit,
        filteredTodos
    }
}