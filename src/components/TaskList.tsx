"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import useTaskStore from "@/lib/store";
import TaskItem from "./TaskItem";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useMemo } from "react";

export default function TaskList() {
  const { tasks, filter, reorderTasks } = useTaskStore();

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks.filter((t) => !t.completed);
  }, [tasks, filter]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {filteredTasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
