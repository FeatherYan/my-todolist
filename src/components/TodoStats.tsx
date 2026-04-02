type TodoStatsProps = {
  totalCount: number;
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ totalCount, activeCount, completedCount }: TodoStatsProps) {
  return (
    <div className="todo-stats">
      <p className="todo-stat-card"><span>Total</span><strong>{totalCount}</strong></p>
      <p className="todo-stat-card"><span>Active</span><strong>{activeCount}</strong></p>
      <p className="todo-stat-card"><span>Completed</span><strong>{completedCount}</strong></p>
    </div>
  );
}
