"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Loader2, MoreHorizontal, Copy, Delete, Flag } from "lucide-react";
import GradientSparklesIcon from "@/components/ui/gradient-sparkles";

import { StatusBadge, type Status } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { deleteClaimById } from "@/lib/gallery/deleteClaimById";
import { toast } from "sonner";
import * as React from "react";
import { useRowActions } from "./row-actions-context";
import { analyzeClaimAndToast } from "@/lib/gallery/analyzeClaimClient";
import { useRouter } from "next/navigation";

export type Claim = {
  id: string;
  title: string;
  status: Status;
  overall_manipulation_score: number | null;
  created_at: string;
  date?: string;
};

// Ensure deterministic date formatting across server and client to avoid
// hydration mismatches. Always use a fixed locale and timezone.
const galleryDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id;
      return <div>{id.slice(0, 8).toUpperCase()}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const iso = row.original.created_at || (row.getValue("date") as string);
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return "-";
      return galleryDateTimeFormatter.format(date);
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "ai_score",
    header: "AI Score",
    cell: ({ row }) => <AiScoreCell claim={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell claim={row.original} />,
  },
];

type ActionsCellProps = { claim: Claim };

function ActionsCell({ claim }: ActionsCellProps) {
  const { startDeleteAnimation, refresh } = useRowActions();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 w-1 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(claim.id)}
        >
          <Copy className="h-4 w-4" />
          Copy Claim ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Flag className="h-4 w-4" />
          Generate Report
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            const { success, error } = await deleteClaimById(claim.id);
            if (success) {
              await startDeleteAnimation(claim.id);
              toast.success("Claim deleted");
              refresh();
            } else {
              toast.error(error || "Delete failed");
            }
          }}
        >
          <Delete className="h-4 w-4" />
          Delete Claim
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AiScoreCellProps = { claim: Claim };

function AiScoreCell({ claim }: AiScoreCellProps) {
  const { refresh } = useRowActions();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const score = claim.overall_manipulation_score;

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const { success, reason, duration } = await analyzeClaimAndToast(
        claim.id,
        claim.title
      );
      if (!success && reason === "NO_IMAGES") {
        const delay = typeof duration === "number" ? duration : 2000;
        setTimeout(() => {
          router?.push(`/claims/${claim.id}?openUpload=1`);
        }, delay);
        return;
      }
      if (success) refresh();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : `Analyze failed for claim ${claim.title}`;
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {score === null && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleAnalyze}
          className="min-w-[120px] cursor-pointer"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <GradientSparklesIcon className="h-4 w-4" />
              Analyze
            </>
          )}
        </Button>
      )}
      {score !== null &&
        (() => {
          const percentNumber = Number((score * 100).toFixed(2));
          const percentLabel = (score * 100).toFixed(2).replace(/\.?0+$/, "");
          return (
            <div className="flex items-center gap-1">
              <div className="w-30">
                <Progress value={percentNumber} />
              </div>
              <span className="tabular-nums min-w-[42px] text-right">
                {percentLabel}%
              </span>
            </div>
          );
        })()}
    </div>
  );
}
