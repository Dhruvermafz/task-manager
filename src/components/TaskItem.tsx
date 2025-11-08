"use client";

import { Checkbox, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useTaskStore from "@/lib/store";
import { Task } from "@/types";
import { memo } from "react";
import { Draggable } from "@hello-pangea/dnd";

interface TaskItemProps {
  task: Task;
  index: number;
}

const TaskItem = memo(({ task, index }: TaskItemProps) => {
  const { toggleTask, deleteTask } = useTaskStore();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex items-center justify-between px-4 py-3 rounded-md border shadow-sm bg-white dark:bg-gray-800 transition-colors ${
            task.completed
              ? "opacity-70 line-through text-gray-500 dark:text-gray-400"
              : "text-gray-800 dark:text-gray-100"
          }`}
        >
          <Space size="middle" className="flex-1">
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="truncate">{task.title}</span>
          </Space>

          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            size="small"
            onClick={() => deleteTask(task.id)}
          />
        </div>
      )}
    </Draggable>
  );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
