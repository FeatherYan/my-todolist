import TodoItemComponent from "../../components/TodoItem";
import TodoInput from "../../components/TodoInput";
import TodoFilter from "../../components/TodoFilter";
import { useTodos } from "../../hooks/useTodos"; 
import Todostats from "../../components/TodoStats";

export default function Todo() {
    const {
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
        filteredTodos,
        totalCount,
        completedCount,
        activeCount
    } = useTodos();

    return (
        <div>
            <h1>Todos</h1>
            <TodoInput 
                inputValue={inputValue} 
                onInputChange={setInputValue} 
                onAdd={addTodo} 
            />
            <TodoFilter filter={filter} onFilterChange={setFilter} />
            <Todostats totalCount={totalCount} activeCount={activeCount} completedCount={completedCount} />
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