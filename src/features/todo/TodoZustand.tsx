import { useTodoZustandStore } from "../../store/todoZustandStore";
import { useState, useEffect } from "react";
import TodoItemComponent from "../../components/TodoItem";
import TodoInput from "../../components/TodoInput";
import TodoFilter from "../../components/TodoFilter";
import TodoStats from "../../components/TodoStats";
import { saveTodos, TODO_ZUSTAND_STORAGE_KEY } from "../../services/todoStorage";

export default function TodoZustand() {
    const todos = useTodoZustandStore(state => state.todos);
    const filter = useTodoZustandStore(state => state.filter);
    const editingId = useTodoZustandStore(state => state.editingId);
    const tempText = useTodoZustandStore(state => state.tempText);
    const addTodo = useTodoZustandStore(state => state.addTodo);
    const deleteTodo = useTodoZustandStore(state => state.deleteTodo);
    const toggleTodo = useTodoZustandStore(state => state.toggleTodo);
    const setFilter = useTodoZustandStore(state => state.setFilter);
    const startEdit = useTodoZustandStore(state => state.startEdit);
    const setTempText = useTodoZustandStore(state => state.setTempText);
    const saveEdit = useTodoZustandStore(state => state.saveEdit);
    const cancelEdit = useTodoZustandStore(state => state.cancelEdit);
    
    const [inputValue, setInputValue] = useState("");

    const filteredTodos = todos.filter((item) => {
        if (filter === "active") return !item.done;
        if (filter === "completed") return item.done;
        return true;
    });

    const totalCount = todos.length;
    const completedCount = todos.filter((item) => item.done).length;
    const activeCount = todos.filter((item) => !item.done).length; 

    const addTodoHandler = () => {
        if(inputValue.trim() !== "") {
            addTodo(inputValue);
            setInputValue("");
        }
    };
    useEffect(() => {
        saveTodos(TODO_ZUSTAND_STORAGE_KEY, todos);
    }, [todos]);
    return (
            <div className="todo-board">
                <h2 className="todo-board-title">Todos</h2>
                <TodoInput 
                    inputValue={inputValue} 
                    onInputChange={setInputValue} 
                    onAdd={addTodoHandler} 
                />
                <TodoFilter filter={filter} onFilterChange={setFilter} />
                <TodoStats totalCount={totalCount} activeCount={activeCount} completedCount={completedCount} />
                <ul className="todo-list">
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
                                    onSave={() => saveEdit()}
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
