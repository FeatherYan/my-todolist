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
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Enter a new todo"
            />
            <button onClick={onAdd}>Add Todo</button>
        </div>
    )
}