"use client";

import * as React from "react";
import { Upload, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type UploadStatus = "uploading" | "done" | "error";

type UploadItem = {
  id: string;
  file: File;
  url: string;
  progress: number;
  status: UploadStatus;
};

type GalleryImageUploaderProps = {
  onChange?: (files: File[]) => void;
  className?: string;
};

export function GalleryImageUploader({
  onChange,
  className,
}: GalleryImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [items, setItems] = React.useState<UploadItem[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [items]);

  React.useEffect(() => {
    if (!onChange) return;
    onChange(items.filter((i) => i.status === "done").map((i) => i.file));
  }, [items, onChange]);

  function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/")
    );
    const newItems: UploadItem[] = files.map((file) => ({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
      progress: 0,
      status: "uploading",
    }));

    setItems((prev) => [...newItems, ...prev]);
    newItems.forEach(simulateUpload);
  }

  function simulateUpload(item: UploadItem) {
    // Simulate an upload with incremental progress
    const totalMs = 900 + Math.floor(Math.random() * 1200);
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, progress: next } : it))
      );
      if (next < 100) {
        requestAnimationFrame(tick);
      } else {
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, status: "done" } : it))
        );
      }
    };
    requestAnimationFrame(tick);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }

  function handleBrowse() {
    inputRef.current?.click();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      addFiles(files);
      // allow selecting the same file again
      e.currentTarget.value = "";
    }
  }

  function removeItem(id: string) {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((i) => i.id !== id);
    });
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Card className="w-full">
        <CardContent className="p-4">
          <div
            onClick={handleBrowse}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={cn(
              "border-2 border-dashed rounded-md p-4 text-center cursor-pointer",
              "bg-muted/20 hover:bg-muted/30 transition-colors",
              isDragging ? "border-primary/60 bg-muted/40" : "border-border"
            )}
            aria-label="Upload images"
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="size-6 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Click to upload or drag & drop
              </div>
              <div className="text-[11px] text-muted-foreground/80">
                PNG, JPG, JPEG — multiple files supported
              </div>
              <div>
                <Button size="sm" variant="outline" className="mt-2">
                  Browse files
                </Button>
              </div>
            </div>

            {items.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!over || active.id === over.id) return;
                  setItems((prev) => {
                    const oldIndex = prev.findIndex((i) => i.id === active.id);
                    const newIndex = prev.findIndex((i) => i.id === over.id);
                    return arrayMove(prev, oldIndex, newIndex);
                  });
                }}
              >
                <SortableContext
                  items={items.map((i) => i.id)}
                  strategy={rectSortingStrategy}
                >
                  <div
                    className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {items.map((item) => (
                      <SortableThumb
                        key={item.id}
                        item={item}
                        onRemove={() => removeItem(item.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GalleryImageUploader;

function SortableThumb({
  item,
  onRemove,
}: {
  item: UploadItem;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative aspect-square rounded-md overflow-hidden border bg-muted/20",
        isDragging && "ring-2 ring-primary/50"
      )}
      {...attributes}
      {...listeners}
    >
      <Image
        src={item.url}
        alt={item.file.name}
        fill
        unoptimized
        sizes="(min-width: 1024px) 200px, 33vw"
        className="object-cover select-none"
        draggable={false}
      />

      {/* delete button: centered trash icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-destructive shadow-xs backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/90"
          aria-label="Remove image"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {item.status === "uploading" && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur flex flex-col items-center justify-center gap-3 p-3">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
          <Progress value={item.progress} className="w-full" />
        </div>
      )}
    </div>
  );
}
