import { useState } from "react"
export default function Todo() {
    const [todos, setTodos] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const addTodo = () => {
        if(inputValue.trim() !== "") {
            const newTodo = inputValue.trim();
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    }
    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
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
                {todos.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>        
        </div>
    )
}