import {
  Cylinder,
  Grid,
  RectangleEllipsis,
  Calendar as CalendarIcon,
  Hash,
} from "lucide-react";

import { type SidebarDraggable } from "@/features/editor/components/sidebar-draggable";

export type NodeTypes =
  | "bucket"
  | "measurement"
  | "field"
  | "dateRange"
  | "valueThreshold";

export const nodes: Record<NodeTypes, SidebarDraggable> = {
  bucket: {
    label: "Selector",
    title: "Bucket",
    icon: Cylinder,
  },
  measurement: {
    label: "Selector",
    title: "Measurement",
    icon: Grid,
  },
  field: {
    label: "Selector",
    title: "Field",
    icon: RectangleEllipsis,
  },
  dateRange: {
    label: "Filter",
    title: "Date Range",
    icon: CalendarIcon,
  },
  valueThreshold: {
    label: "Filter",
    title: "Value Threshold",
    icon: Hash,
  },
};
