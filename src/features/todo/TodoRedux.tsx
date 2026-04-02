import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { addTodo, removeTodo, toggleTodo, setFilter, startEdit, setTempText, saveEdit, cancelEdit } from "../../store/todoSlice";
import TodoInput from "../../components/TodoInput";
import TodoFilter from "../../components/TodoFilter";
import TodoStats from "../../components/TodoStats";
import TodoItemComponent from "../../components/TodoItem"; 
import { saveTodos, TODO_REDUX_STORAGE_KEY } from "../../services/todoStorage";
import {
    selectFilteredTodos,
    selectTotalCount,
    selectCompletedCount,
    selectActiveCount,
    selectTodos,
    selectFilter,
    selectEditingId,
    selectTempText
} from "../../store/selectors/todoSelectors";

export default function TodoRedux() {
    const todos = useAppSelector(selectTodos);
    useEffect(() => {
        saveTodos(TODO_REDUX_STORAGE_KEY, todos);
    }, [todos]);
    const filter = useAppSelector(selectFilter);
    const editingId = useAppSelector(selectEditingId);
    const tempText = useAppSelector(selectTempText);
    const dispatch = useAppDispatch();
    
    // 本地state
    const [inputValue, setInputValue] = useState(""); 
    
    const addTodoHandler = () => {
        if(inputValue.trim() !== "") {
            dispatch(addTodo(inputValue));
            setInputValue("");
        }
    };

    const filteredTodos = useAppSelector(selectFilteredTodos);
    const totalCount = useAppSelector(selectTotalCount);
    const completedCount = useAppSelector(selectCompletedCount);
    const activeCount = useAppSelector(selectActiveCount);
    
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