"use client";

import * as React from "react";
import { Loader2, Upload, Trash2 } from "lucide-react";
import GradientSparklesIcon from "@/components/ui/gradient-sparkles";
import { Button } from "@/components/ui/button";
import { analyzeClaimAndToast } from "@/lib/gallery/analyzeClaimClient";
import { deleteClaimById } from "@/lib/gallery/deleteClaimById";
import { toast } from "sonner";
import GalleryImageUploader from "@/components/dashboard/gallery/image-uploader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { uploadImage } from "@/lib/gallery/uploadImage";

type ClaimsToolTipsProps = {
  claimId: string;
  title: string;
  imageRisk: unknown | null;
  onRefresh?: () => void;
};

export function ClaimsToolTips({
  claimId,
  title,
  imageRisk,
  onRefresh,
}: ClaimsToolTipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const closeUploadRef = React.useRef<HTMLButtonElement | null>(null);
  const [openUpload, setOpenUpload] = React.useState(false);

  // Auto-open Upload dialog based on query param
  React.useEffect(() => {
    const open = searchParams.get("openUpload");
    if (open === "1" && !openUpload) {
      setOpenUpload(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("openUpload");
      const nextUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(nextUrl, { scroll: false });
    }
  }, [searchParams, openUpload, pathname, router]);

  async function handleAnalyze() {
    try {
      setIsAnalyzing(true);
      const { success, reason, duration } = await analyzeClaimAndToast(
        claimId,
        title
      );
      if (!success && reason === "NO_IMAGES") {
        const delay = typeof duration === "number" ? duration : 2000;
        setTimeout(() => setOpenUpload(true), delay);
        return;
      }
      if (success) onRefresh?.();
    } catch {
      toast.error(`Analyze failed for claim ${title}`);
    } finally {
      setIsAnalyzing(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const { success, error } = await deleteClaimById(claimId);
      if (success) {
        toast.success("Claim deleted");
        router.push("/gallery");
        onRefresh?.();
      } else {
        toast.error(error || "Delete failed");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleAnalyze}
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
            {imageRisk != null ? "Re-analyze" : "Analyze"}
          </>
        )}
      </Button>

      <Dialog open={openUpload} onOpenChange={setOpenUpload}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Select one image to upload to this claim.
            </DialogDescription>
          </DialogHeader>
          {/* Hidden close button to programmatically close dialog after success */}
          <DialogClose asChild>
            <button ref={closeUploadRef} className="hidden" />
          </DialogClose>
          <form
            className="grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!selectedFiles || selectedFiles.length === 0) {
                toast.error("Please choose at least one image");
                return;
              }
              try {
                setIsUploading(true);
                const { success, error } = await uploadImage(
                  claimId,
                  selectedFiles
                );
                if (success) {
                  toast.success("Image uploaded");
                  closeUploadRef.current?.click();
                  setSelectedFiles([]);
                  // Ensure the server component re-fetches data immediately
                  router.refresh();
                  onRefresh?.();
                } else {
                  toast.error(error || "Upload failed");
                }
              } finally {
                setIsUploading(false);
              }
            }}
          >
            <GalleryImageUploader onChange={setSelectedFiles} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Confirm"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-destructive hover:text-destructive/80"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}

export default ClaimsToolTips;
