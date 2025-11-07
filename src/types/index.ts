export type Task = {
  id: string;
  title: string;
  completed: boolean;
  order: number;
};

export type FilterType = "all" | "pending" | "completed";
