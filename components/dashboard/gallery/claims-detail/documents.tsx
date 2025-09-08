"use client";

import * as React from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";

export function ClaimsDetailDocuments({ documents }: { documents: string[] }) {
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [viewerIndex, setViewerIndex] = React.useState(0);
  const [viewerApi, setViewerApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!viewerApi) return;
    const onSelect = () => setViewerIndex(viewerApi.selectedScrollSnap());
    viewerApi.on("select", onSelect);
    return () => {
      viewerApi.off("select", onSelect);
    };
  }, [viewerApi]);

  function openViewerAt(index: number) {
    setViewerIndex(index);
    setIsViewerOpen(true);
  }

  function saveCurrentImage() {
    const current = documents[viewerIndex];
    if (!current) return;
    const link = document.createElement("a");
    link.href = current;
    try {
      const url = new URL(current);
      const pathname = url.pathname.split("/").pop() || "image";
      link.download = pathname;
    } catch {
      link.download = "image";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Card className="w-full">
      <CardContent className="relative flex aspect-square items-center justify-center p-6">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {documents.map((document, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full aspect-square">
                  <button
                    type="button"
                    onClick={() => openViewerAt(index)}
                    className="absolute inset-0 cursor-zoom-in"
                    aria-label="Open fullscreen"
                  >
                    <Image
                      src={document}
                      alt={`Document ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-contain object-center rounded-md"
                      priority={false}
                    />
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="!left-[-8] top-1/2 -translate-y-1/2 shadow-sm bg-background/80 hover:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
          <CarouselNext className="!right-[-8] top-1/2 -translate-y-1/2 shadow-sm bg-background/80 hover:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
        </Carousel>
        <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
          <DialogContent
            className="p-0 w-screen h-screen max-w-none rounded-none border-none bg-background"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">Image Viewer</DialogTitle>
            <div className="relative w-full h-full">
              <Carousel
                className="w-full h-full"
                opts={{ startIndex: viewerIndex }}
                setApi={setViewerApi}
              >
                <CarouselContent className="h-full">
                  {documents.map((document, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="relative w-full h-[100vh] bg-black/95">
                        <Image
                          src={document}
                          alt={`Document ${index + 1}`}
                          fill
                          sizes="100vw"
                          className="object-contain object-center rounded-md"
                          priority={isViewerOpen}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 shadow-sm bg-background/80 hover:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60" /> */}
                {/* <CarouselNext className="right-4 top-1/2 -translate-y-1/2 shadow-sm bg-background/80 hover:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60" /> */}
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={saveCurrentImage}
                  className="shadow-sm bg-background/80 hover:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                  aria-label="Save image"
                >
                  <Download />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
