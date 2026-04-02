// Todo.tsx 作为一个页面组件，负责渲染整个 Todo 页面
// 提供切换 UI（按钮 / Tabs）
// 根据当前选中的版本，渲染：TodoUseState & TodoRedux
import { useState } from "react";
import TodoUseState from "../features/todo/TodoUseState";
import TodoRedux from "../features/todo/TodoRedux";
import { TodoZustand } from "../features/todo/TodoZustand";

type TabKey = "useState" | "redux" | "zustand";


export default function Todo() {
    const [activeTab, setActiveTab] = useState<TabKey>("useState");
    return (
        <div>
            <h1>Todo App</h1>
            <div>
                <button onClick={() => setActiveTab("useState")}>
                useState Version
                </button>
                <button onClick={() => setActiveTab("redux")}>
                    Redux Toolkit Version
                </button>
                <button onClick={() => setActiveTab("zustand")}>
                    Zustand Version
                </button>
            </div>
            <div>
                {activeTab === "useState" ? <TodoUseState /> : activeTab === "zustand" ? <TodoZustand /> : <TodoRedux />}
            </div>
        </div>
    )
}

