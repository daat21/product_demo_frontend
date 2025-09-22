"use client";

import * as React from "react";
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
import Link from "next/link";
import { addNewClaim } from "@/lib/gallery/addNewClaim";
import { toast } from "sonner";
import { useRowActions } from "./row-actions-context";

export function DataTableToolbar() {
  const { refresh } = useRowActions();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await addNewClaim(title.trim(), description.trim(), files);
      const createdId = (res && (res.claim_id as string)) || undefined;
      if (createdId) {
        toast.success(`Claim ${title.trim()} created`);
        setOpen(false);
        setTitle("");
        setDescription("");
        setFiles([]);
        refresh();
      } else {
        toast.error("Create failed");
      }
    } catch {
      toast.error("Create failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Link href="/gallery" className="hover:underline">
        <Button
          variant="link"
          className="text-2xl font-semibold tracking-tight cursor-pointer"
        >
          Gallery
        </Button>
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Search..."
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
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
              <form
                id="add-claim-form"
                onSubmit={onSubmit}
                className="grid gap-4"
              >
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Title</Label>
                  <Input
                    id="name-1"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Narrative</Label>
                  <Input
                    id="username-1"
                    name="description"
                    placeholder="Narrative"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Date</Label>
                  <Calendar28 disabled />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Documents</Label>
                  <GalleryImageUploader onChange={setFiles} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer"
                  >
                    {isSubmitting ? "Creating..." : "Confirm"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
