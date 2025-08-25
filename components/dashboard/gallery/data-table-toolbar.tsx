import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";

export function DataTableToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input placeholder="Search..." className="h-8 w-[150px] lg:w-[250px]" />
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">
          <CirclePlus />
          Add Claim
        </Button>
      </div>
    </div>
  );
}
