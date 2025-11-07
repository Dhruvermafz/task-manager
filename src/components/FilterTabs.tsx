"use client";

import { Segmented } from "antd";
import useTaskStore from "@/lib/store";
import { FilterType } from "@/types";

const options = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export default function FilterTabs() {
  const { filter, setFilter } = useTaskStore();

  return (
    <Segmented
      options={options}
      value={filter}
      onChange={(value) => setFilter(value as FilterType)}
      block
      className="mb-4"
    />
  );
}
