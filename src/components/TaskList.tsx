"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import useTaskStore from "@/lib/store";
import TaskItem from "./TaskItem";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useMemo, useCallback } from "react";

export default function TaskList() {
  const { tasks, filter, reorderTasks } = useTaskStore();

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks.filter((t) => !t.completed);
  }, [tasks, filter]);

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;
      reorderTasks(result.source.index, result.destination.index);
    },
    [reorderTasks]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-2"
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6 select-none">
                No tasks to show.
              </p>
            )}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
