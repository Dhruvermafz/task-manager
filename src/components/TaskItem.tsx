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
          className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border transition-all ${
            task.completed ? "opacity-60 line-through" : ""
          }`}
        >
          <Space>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="flex-1">{task.title}</span>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteTask(task.id)}
              size="small"
            />
          </Space>
        </div>
      )}
    </Draggable>
  );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
