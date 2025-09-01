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

export function ClaimsDetailDocuments({ documents }: { documents: string[] }) {
  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardContent className="relative flex aspect-square items-center justify-center p-6">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {documents.map((document, index) => (
              <CarouselItem key={index}>
                <div className="p-1 flex items-center justify-center">
                  <Image
                    src={`/${document}`}
                    alt={`Document ${index + 1}`}
                    width={200}
                    height={200}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="!left-[-8] top-1/2 -translate-y-1/2 shadow-sm bg-background/80 hover:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
          <CarouselNext className="!right-[-8] top-1/2 -translate-y-1/2 shadow-sm bg-background/80 hover:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
