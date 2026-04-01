import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useState } from "react";
import { addTodo, removeTodo, toggleTodo, setFilter, startEdit, setTempText, saveEdit, cancelEdit } from "../../store/todoSlice";
import TodoInput from "../../components/TodoInput";
import TodoFilter from "../../components/TodoFilter";
import TodoStats from "../../components/TodoStats";
import TodoItemComponent from "../../components/TodoItem";

export default function TodoRedux() {
    const todos = useAppSelector(state => state.todo.todos);
    const filter = useAppSelector(state => state.todo.filter);
    const editingId = useAppSelector(state => state.todo.editingId);
    const tempText = useAppSelector(state => state.todo.tempText);  
    const dispatch = useAppDispatch();
    
    // 本地state
    const [inputValue, setInputValue] = useState(""); 
    
    const addTodoHandler = () => {
        if(inputValue.trim() !== "") {
            dispatch(addTodo(inputValue));
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
    
    return (
        <div>
            <h1>Todos</h1>
            
            <TodoInput 
                inputValue={inputValue} 
                onInputChange={setInputValue} 
                onAdd={addTodoHandler} 
            />

            <TodoFilter filter={filter} onFilterChange={(value) => dispatch(setFilter(value))} />
            
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
                                onEdit={() => dispatch(startEdit(item))}
                                onToggle={() => dispatch(toggleTodo(item.id))}
                                onDelete={() => dispatch(removeTodo(item.id))}
                                onSave={() => dispatch(saveEdit())}
                                onCancel={() => dispatch(cancelEdit())}
                                onTempTextChange={(text) => dispatch(setTempText(text))}
                            />
                        );
                    })
                }
            </ul> 
        </div>
    );
}