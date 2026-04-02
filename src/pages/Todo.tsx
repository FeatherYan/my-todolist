// Todo.tsx 作为一个页面组件，负责渲染整个 Todo 页面
// 提供切换 UI（按钮 / Tabs）
// 根据当前选中的版本，渲染：TodoUseState & TodoRedux
import { useState } from "react";
import TodoUseState from "../features/todo/TodoUseState";
import TodoRedux from "../features/todo/TodoRedux";
import TodoZustand from "../features/todo/TodoZustand";
import TodoContext from "../features/todo/TodoContext";
import { TodoProvider } from "../context/TodoContextStore";

type TabKey = "useState" | "redux" | "zustand" | "context";


export default function Todo() {
    const [activeTab, setActiveTab] = useState<TabKey>("useState");
    return (
        <div className="todo-page">
            <div className="todo-page-header">
                <p className="todo-eyebrow">State Management Showcase</p>
                <h1>Todo App</h1>
                <p className="todo-page-copy">Same product experience, different state management strategies.</p>
            </div>
            <div className="todo-tabs">
                <button className={`todo-tab ${activeTab === "useState" ? "todo-tab-active" : ""}`} onClick={() => setActiveTab("useState")}>
                useState Version
                </button>
                <button className={`todo-tab ${activeTab === "redux" ? "todo-tab-active" : ""}`} onClick={() => setActiveTab("redux")}>
                    Redux Toolkit Version
                </button>
                <button className={`todo-tab ${activeTab === "zustand" ? "todo-tab-active" : ""}`} onClick={() => setActiveTab("zustand")}>
                    Zustand Version
                </button>
                <button className={`todo-tab ${activeTab === "context" ? "todo-tab-active" : ""}`} onClick={() => setActiveTab("context")}>
                    Context Version
                </button>
            </div>
            <div className="todo-view-shell">
                {activeTab === "useState" ? <TodoUseState /> : activeTab === "zustand" ? <TodoZustand /> : activeTab === "context" ? (<TodoProvider><TodoContext /></TodoProvider>) : <TodoRedux />}
            </div>
        </div>
    )
}

