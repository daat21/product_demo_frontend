import { CalendarIcon } from "lucide-react";
import { ClaimStatus, StatusBadge } from "@/components/dashboard/status-badge";

export function ClaimsDetailHeader({
  title,
  status,
  date,
}: {
  title: string;
  status: ClaimStatus;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          {title}
          <StatusBadge status={status} className="ml-2" />
        </h2>
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <CalendarIcon className="size-3" />
          {date}
        </p>
      </div>
    </div>
  );
}
