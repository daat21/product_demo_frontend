"use client";

import { Badge } from "@/components/ui/badge";

export type ClaimStatus = "todo" | "in progress" | "done";

const STATUS_LABELS: Record<ClaimStatus, string> = {
  todo: "To-do",
  "in progress": "In Progress",
  done: "Done",
};

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const STATUS_STYLES: Record<
  ClaimStatus,
  { variant: BadgeVariant; className?: string }
> = {
  todo: { variant: "secondary" },
  "in progress": {
    variant: "outline",
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-400/20 dark:text-yellow-300 dark:border-yellow-400/30",
  },
  done: {
    variant: "outline",
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-400/20 dark:text-green-300 dark:border-green-400/30",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ClaimStatus;
  className?: string;
}) {
  const style = STATUS_STYLES[status];
  return (
    <Badge
      variant={style.variant}
      className={[style.className, className].filter(Boolean).join(" ")}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}

export const statusLabels = STATUS_LABELS;
