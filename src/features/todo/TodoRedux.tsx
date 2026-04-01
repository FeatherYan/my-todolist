import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useState } from "react";
import { addTodo, removeTodo, toggleTodo, setFilter } from "../../store/todoSlice";
import TodoInput from "../../components/TodoInput";
import TodoFilter from "../../components/TodoFilter";
export default function TodoRedux() {
    const todos = useAppSelector(state => state.todo.todos);
    const filter = useAppSelector(state => state.todo.filter);
    const dispatch = useAppDispatch();
    // 本地state
    const [inputValue, setInputValue] = useState(""); 
    const addTodoHandler = () => {
        if(inputValue.trim() !== "") {
            dispatch(addTodo(inputValue));
            setInputValue("");
        }
    }
    const deleteTodoHandler = (id: number) => {
        dispatch(removeTodo(id));
    }
    const toggleTodoHandler = (id: number) => {
        dispatch(toggleTodo(id));
    }

    const filteredTodos = todos.filter((item) => {
        if (filter === "active") return !item.done;
        if (filter === "completed") return item.done;
        return true;
    });

    return (
        <div>
            <h1>Todos</h1>
            <TodoInput 
                inputValue={inputValue} 
                onInputChange={setInputValue} 
                onAdd={addTodoHandler} 
            />
            <TodoFilter filter={filter} onFilterChange={(value) => dispatch(setFilter(value))} />
            <ul>
                {filteredTodos.map((item) => (
                    <li key={item.id}>
                    <span style={{ textDecoration: item.done ? "line-through" : "none" }}>
                        {item.text}
                    </span>
                    <button onClick={() => toggleTodoHandler(item.id)}>
                        {item.done ? "Undo" : "Done"}
                    </button>
                    <button onClick={() => deleteTodoHandler(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}