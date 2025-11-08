"use client";

import { Segmented } from "antd";
import useTaskStore from "@/lib/store";
import { FilterType } from "@/types";

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export default function FilterTabs() {
  const { filter, setFilter } = useTaskStore();

  return (
    <div className="mb-4">
      <Segmented
        options={FILTER_OPTIONS}
        value={filter}
        onChange={(value) => setFilter(value as FilterType)}
        block
        className="ant-segmented w-full"
      />
    </div>
  );
}
