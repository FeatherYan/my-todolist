type TodoStatsProps = {
  totalCount: number;
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ totalCount, activeCount, completedCount }: TodoStatsProps) {
  return (
    <div>
      <p>Total: {totalCount}</p>
      <p>Active: {activeCount}</p>
      <p>Completed: {completedCount}</p>
    </div>
  );
}