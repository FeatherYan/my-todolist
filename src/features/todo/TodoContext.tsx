import TodoItemComponent from "../../components/TodoItem";
import TodoInput from "../../components/TodoInput";
import TodoFilter from "../../components/TodoFilter";
import TodoStats from "../../components/TodoStats";
import { useState,useEffect  } from "react";
import { useTodoContext } from "../../context/TodoContextStore";
import { saveTodos, TODO_CONTEXT_STORAGE_KEY } from "../../services/todoStorage";
export default function TodoContext() {
    const { state, dispatch } = useTodoContext();
    const { todos, filter, editingId, tempText } = state;

    const [inputValue, setInputValue] = useState("");

    const addTodoHandler = () => {
        if(inputValue.trim() !== "") {
            dispatch({ type: "ADD_TODO", payload: inputValue });
            setInputValue("");
        }
    };
    const filteredTodos = todos.filter((item) => {
        if (filter === "active") return !item.done;
        if (filter === "completed") return item.done;
        return true;
    });

    const totalCount = todos.length;
    const completedCount = todos.filter((item) => item.done).length;
    const activeCount = todos.filter((item) => !item.done).length;
    

    useEffect(() => {
        saveTodos(TODO_CONTEXT_STORAGE_KEY, todos);
    }, [todos]);

    return (
            <div>
                <h1>Todos</h1>
                <TodoInput 
                    inputValue={inputValue} 
                    onInputChange={setInputValue} 
                    onAdd={addTodoHandler} 
                />
                <TodoFilter filter={filter} onFilterChange={(filter) => dispatch({ type: "SET_FILTER", payload: filter })} />
                <TodoStats totalCount={totalCount} activeCount={activeCount} completedCount={completedCount} />
                <ul>
                    {
                        filteredTodos.map((item) => {
                            return (
                                <TodoItemComponent
                                    key={item.id}
                                    item={item}
                                    isEditing={item.id === editingId}
                                    tempText={tempText}
                                    onEdit={() => dispatch({ type: "START_EDIT", payload: item })}
                                    onToggle={() => dispatch({ type: "TOGGLE_TODO", payload: item.id })}
                                    onDelete={() => dispatch({ type: "REMOVE_TODO", payload: item.id })}
                                    onSave={() => dispatch({ type: "SAVE_EDIT" })}
                                    onCancel={() => dispatch({ type: "CANCEL_EDIT" })}
                                    onTempTextChange={(text) => dispatch({ type: "SET_TEMP_TEXT", payload: text })}
                                />
                            );
                        })
                    }
                </ul>        
            </div>
        )
}