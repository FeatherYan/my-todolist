import type { RootState } from "../../app/store";

// 原始数据 selector
export const selectTodos = (state: RootState) => state.todo.todos;
export const selectFilter = (state: RootState) => state.todo.filter;
export const selectEditingId = (state: RootState) => state.todo.editingId;
export const selectTempText = (state: RootState) => state.todo.tempText;

// 派生数据 selector
export const selectFilteredTodos = (state: RootState) => {
    const todos = selectTodos(state);
    const filter = selectFilter(state);

    if (filter === "active") return todos.filter(t => !t.done);
    if (filter === "completed") return todos.filter(t => t.done);
    return todos;
};

// 统计数据 selector
export const selectTotalCount = (state: RootState) => {
    return selectTodos(state).length;
};

export const selectCompletedCount = (state: RootState) => {
    return selectTodos(state).filter(t => t.done).length;
};

export const selectActiveCount = (state: RootState) => {
    return selectTodos(state).filter(t => !t.done).length;
};