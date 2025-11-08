"use client";

import { Input, Button, Form } from "antd";
import useTaskStore from "@/lib/store";
import { useCallback } from "react";

export default function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values: { title: string }) => {
      const title = values.title.trim();
      if (title) {
        addTask(title);
        form.resetFields();
      }
    },
    [addTask, form]
  );

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="inline"
      className="mb-6 input-field w-full"
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Task cannot be empty." }]}
        className="flex-1"
      >
        <Input placeholder="Add a new task..." className="w-full" allowClear />
      </Form.Item>

      <Form.Item noStyle>
        <Button type="primary" htmlType="submit" className="ml-2">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
