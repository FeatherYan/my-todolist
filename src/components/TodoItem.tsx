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
        <li>
            <input
                type="text"
                value={tempText}
                onChange={(e) => onTempTextChange(e.target.value)}
            />
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </li>
    ):(
        <li>
            <span style={{ textDecoration: item.done ? "line-through" : "none" }}>
                {item.text}
            </span>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onToggle}>
                {item.done ? "Undo" : "Done"}
            </button>
            <button onClick={onDelete}>Delete</button>
        </li>
    )
}



