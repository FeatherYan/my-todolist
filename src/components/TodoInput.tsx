type TodoInputProps = {
    inputValue: string;
    onInputChange: (value: string) => void;
    onAdd: () => void;
}
export default function TodoInput({
    inputValue,
    onInputChange,
    onAdd
}: TodoInputProps) {
    return (
        <div className="todo-input-row">
            <input
                className="todo-input"
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button className="todo-button todo-button-primary" onClick={onAdd}>Add Todo</button>
        </div>
    )
}
