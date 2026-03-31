import { useState, useEffect } from "react"
import TodoItemComponent from "../components/TodoItem";
import TodoInput from "../components/TodoInput";
import TodoFilter from "../components/TodoFilter";
import type { TodoData, Filter  } from "../types/todo";
import useTodos from "../hooks/useTodos";

export default function Todo() {
    const {
        inputValue,
        setInputValue,
        editingId,
        setEditingId,
        tempText,
        setTempText,
        filter,
        setFilter,
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        toggleTodo,
        startEdit,
        saveEdit,
        cancelEdit,
        filteredTodos
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