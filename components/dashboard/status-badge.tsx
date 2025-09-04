"use client";

import { Badge } from "@/components/ui/badge";

export type Status = "todo" | "in progress" | "done" | "high" | "medium" | "low" | "new" | "finalized" | "green" | "yellow" | "red" | "blue";

const STATUS_LABELS: Record<Status, string> = {
  todo: "To-do",
  "in progress": "In Progress",
  done: "Done",
  high: "High",
  medium: "Medium",
  low: "Low",
  new: "New",
  finalized: "Finalized",
  green: "Green",
  yellow: "Yellow",
  red: "Red",
  blue: "Blue",
};

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// Define reusable base styles
const greenStyle = {
  variant: "outline" as const,
  className:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-400/20 dark:text-green-300 dark:border-green-400/30",
};

const yellowStyle = {
  variant: "outline" as const,
  className:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-400/20 dark:text-yellow-300 dark:border-yellow-400/30",
};

const blueStyle = {
  variant: "outline" as const,
  className:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-400/20 dark:text-blue-300 dark:border-blue-400/30",
};

const redStyle = {
  variant: "outline" as const,
  className:
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-400/20 dark:text-red-300 dark:border-red-400/30",
};

// Use them in the map
const STATUS_STYLES: Record<
  Status,
  { variant: BadgeVariant; className?: string }
> = {
  todo: { variant: "secondary" },
  "in progress": yellowStyle,
  medium: yellowStyle,
  yellow: yellowStyle,

  done: greenStyle,
  low: greenStyle,
  finalized: greenStyle,
  green: greenStyle,

  new: blueStyle,
  blue: blueStyle,

  high: redStyle,
  red: redStyle,
};

export function StatusBadge({
  status,
  className,
  content
}: {
  status: Status;
  className?: string;
  content?: React.ReactNode;
}) {
  const style = STATUS_STYLES[status];
  return (
    <Badge
      variant={style.variant}
      className={[style.className, className].filter(Boolean).join(" ")}
    >
      {content ? content : STATUS_LABELS[status]}
    </Badge>
  );
}

export const statusLabels = STATUS_LABELS;
