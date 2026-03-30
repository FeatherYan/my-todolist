import type { Filter } from "../types/todo";

type TodoFilterProps = {
    filter: Filter;
    onFilterChange: (filter: Filter) => void;
};
export default function TodoFilter({ filter, onFilterChange }: TodoFilterProps) {
    return (
        <div>
            <button onClick={() => onFilterChange("all")} disabled={filter === "all"}>All</button>
            <button onClick={() => onFilterChange("active")} disabled={filter === "active"}>Active</button>
            <button onClick={() => onFilterChange("completed")} disabled={filter === "completed"}>Completed</button>
        </div>
    )
}