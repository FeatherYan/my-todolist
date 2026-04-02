import type { TodoData } from "../types/todo";

type TodoItemProps = {
    item: TodoData;
    isEditing: boolean;
    tempText: string;
    onEdit: () => void;
    onToggle: () => void;
    onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
    onTempTextChange: (text: string) => void;
}

export default function TodoItemComponent({
  item,
  isEditing,
  tempText,
  onEdit,
  onToggle,
  onDelete,
  onSave,
  onCancel,
  onTempTextChange,
}: TodoItemProps) {
    return isEditing ? (
        <li className="todo-item todo-item-editing">
            <input
                className="todo-item-input"
                type="text"
                value={tempText}
                onChange={(e) => onTempTextChange(e.target.value)}
            />
            <div className="todo-item-actions">
                <button className="todo-button todo-button-primary" onClick={onSave}>Save</button>
                <button className="todo-button" onClick={onCancel}>Cancel</button>
            </div>
        </li>
    ):(
        <li className={`todo-item ${item.done ? "todo-item-done" : ""}`}>
            <span className="todo-item-text" style={{ textDecoration: item.done ? "line-through" : "none" }}>
                {item.text}
            </span>
            <div className="todo-item-actions">
                <button className="todo-button" onClick={onEdit}>Edit</button>
                <button className="todo-button" onClick={onToggle}>
                    {item.done ? "Undo" : "Done"}
                </button>
                <button className="todo-button todo-button-danger" onClick={onDelete}>Delete</button>
            </div>
        </li>
    )
}



