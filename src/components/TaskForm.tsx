"use client";

import { Input, Button, Form } from "antd";
import useTaskStore from "@/lib/store";
import { useCallback } from "react";

export default function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values: { title: string }) => {
      if (values.title.trim()) {
        addTask(values.title);
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
      className="mb-6 glow-input"
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Task cannot be empty!" }]}
        style={{ flex: 1, marginRight: 8 }}
      >
        <Input placeholder="Add a new task..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
