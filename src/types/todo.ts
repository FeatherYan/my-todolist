export type TodoData = {
  id: number;
  text: string;
  done: boolean;
};

export type Filter = "all" | "active" | "completed";