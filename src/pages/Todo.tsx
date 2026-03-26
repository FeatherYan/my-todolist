import { useState, useEffect } from "react"
import TodoItemComponent from "../components/TodoItem";
import TodoInput from "../components/TodoInput";
import TodoFilter from "../components/TodoFilter";

type TodoData = {
    id: number;
    text: string;
    done: boolean;
}
type Filter = "all" | "active" | "completed";

export default function Todo() {
    const [todos, setTodos] = useState<TodoData[]>(() =>{
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempText, setTempText] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

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

    const filteredTodos = todos.filter((item) => {
        if(filter === "active") return !item.done;
        if(filter === "completed") return item.done;
        return true;
    });
    
    return (
        <div>
            <h1>Todos</h1>
            <TodoInput 
                inputValue={inputValue} 
                onInputChange={setInputValue} 
                onAdd={addTodo} 
            />
            <TodoFilter filter={filter} onFilterChange={setFilter} />
            <ul>
                {
                    filteredTodos.map((item) => {
                        return (
                            <TodoItemComponent
                                key={item.id}
                                item={item}
                                isEditing={item.id === editingId}
                                tempText={tempText}
                                onEdit={() => startEdit(item)}
                                onToggle={() => toggleTodo(item.id)}
                                onDelete={() => deleteTodo(item.id)}
                                onSave={() => saveEdit(item.id)}
                                onCancel={cancelEdit}
                                onTempTextChange={setTempText}
                            />
                        );
                    })
                }
            </ul>        
        </div>
    )
}