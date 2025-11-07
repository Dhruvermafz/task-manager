import { create } from "zustand";
import { Task, FilterType } from "@/types";

interface TaskStore {
  tasks: Task[];
  filter: FilterType;
  setTasks: (tasks: Task[]) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  reorderTasks: (sourceIndex: number, destinationIndex: number) => void;
}

/* ---------- Helper: sync with localStorage (no hooks) ---------- */
const STORAGE_KEY = "tasks";

const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error(e);
  }
};

/* --------------------------- Store --------------------------- */
const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: loadTasks(),
  filter: "all" as const,

  setTasks: (tasks) => {
    set({ tasks });
    saveTasks(tasks);
  },

  addTask: (title) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      order: get().tasks.length,
    };
    const updated = [...get().tasks, newTask];
    set({ tasks: updated });
    saveTasks(updated);
  },

  toggleTask: (id) => {
    const updated = get().tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    set({ tasks: updated });
    saveTasks(updated);
  },

  deleteTask: (id) => {
    const updated = get().tasks.filter((t) => t.id !== id);
    set({ tasks: updated });
    saveTasks(updated);
  },

  setFilter: (filter) => set({ filter }),

  reorderTasks: (srcIdx, dstIdx) => {
    const tasks = Array.from(get().tasks);
    const [moved] = tasks.splice(srcIdx, 1);
    tasks.splice(dstIdx, 0, moved);

    const reordered = tasks.map((t, i) => ({ ...t, order: i }));
    set({ tasks: reordered });
    saveTasks(reordered);
  },
}));

export default useTaskStore;
