import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar28 } from "./date-picker";
import { CirclePlus } from "lucide-react";
import { GalleryImageUploader } from "./image-uploader";

export function DataTableToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input placeholder="Search..." className="h-8 w-[150px] lg:w-[250px]" />
      </div>
      <div className="flex items-center gap-2">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button size="sm" className="cursor-pointer">
                <CirclePlus />
                Add Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Claim</DialogTitle>
                <DialogDescription>
                  Add a new claim to the gallery. Click confirm when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Title</Label>
                  <Input id="name-1" name="name" placeholder="Title" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Narrative</Label>
                  <Input
                    id="username-1"
                    name="username"
                    placeholder="Narrative"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Date</Label>
                  <Calendar28 />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Documents</Label>
                  <GalleryImageUploader />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
