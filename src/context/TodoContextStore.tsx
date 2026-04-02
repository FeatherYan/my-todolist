import { createContext, useContext, useReducer, type ReactNode,type Dispatch} from "react";
import type { TodoData, Filter } from "../types/todo";
import { loadTodos, TODO_CONTEXT_STORAGE_KEY } from "../services/todoStorage";
type TodoState = {
  todos: TodoData[];
  filter: Filter;
  editingId: number | null;
  tempText: string;
};

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "SET_FILTER"; payload: Filter }
  | { type: "START_EDIT"; payload: TodoData }
  | { type: "SET_TEMP_TEXT"; payload: string }
  | { type: "SAVE_EDIT" }
  | { type: "CANCEL_EDIT" };

const initialState: TodoState = {
  todos: loadTodos(TODO_CONTEXT_STORAGE_KEY),
  filter: "all",
  editingId: null,
  tempText: "",
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
        case "ADD_TODO":
            const text = action.payload.trim();
            if (!text) return state;
            const newTodo: TodoData = {
                id: Date.now(),
                text: text,
                done: false
            };
            return { ...state, todos: [...state.todos, newTodo] };
        case "REMOVE_TODO":
            return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
        case "TOGGLE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload ? { ...todo, done: !todo.done } : todo
                )
            };
        case "SET_FILTER":
            return { ...state, filter: action.payload };
        case "START_EDIT":
            return {
                ...state,
                editingId: action.payload.id,
                tempText: action.payload.text
            };
        case "SET_TEMP_TEXT":
            return { ...state, tempText: action.payload };
        case "SAVE_EDIT":
            const newText = state.tempText.trim();
            if (!newText) return state;
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === state.editingId ? { ...todo, text: newText } : todo
                ),
                editingId: null,
                tempText: ""
            };
        case "CANCEL_EDIT":
            return {
                ...state,
                editingId: null,
                tempText: ""
            };
        default:
            return state;
    }

}

type TodoContextValue = {
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
};

const TodoContext = createContext<TodoContextValue | null>(null);

type TodoProviderProps = {
  children: ReactNode;
};

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState);  

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}