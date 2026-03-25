import { useState } from "react"
type TodoItem = {
    id: number;
    text: string;
    done: boolean;
}
export default function Todo() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempText, setTempText] = useState("");
    const addTodo = () => {
        if(inputValue.trim() !== "") {
            const newTodo: TodoItem = {
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
    const startEdit = (item: TodoItem) => {
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
    return (
        <div>
            <h1>Todos</h1>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a new todo"
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul>
                {
                    todos.map((item)=>{
                        return item.id === editingId ? (
                            <li key={item.id}>
                                <input
                                    type="text"
                                    value={tempText}
                                    onChange={(e) => setTempText(e.target.value)}
                                />
                                <button onClick={() => saveEdit(item.id)}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </li>
                        ) : (
                            <li key={item.id}>
                                <span style={{ textDecoration: item.done ? "line-through" : "none" }}>
                                    {item.text}
                                </span>
                                <button onClick={() => startEdit(item)}>Edit</button>
                                <button onClick={() => toggleTodo(item.id)}>
                                    {item.done ? "Undo" : "Done"}
                                </button>
                                <button onClick={() => deleteTodo(item.id)}>Delete</button>
                            </li>
                    )
                    })
                }
            </ul>        
        </div>
    )
}