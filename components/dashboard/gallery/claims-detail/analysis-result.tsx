"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  //   CardAction,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import GradientSparklesIcon from "@/components/ui/gradient-sparkles";
import { getClaimScoreById } from "@/lib/gallery/getClaimScoreById";
import { toast } from "sonner";

export function ClaimsDetailAnalysisResult({
  ai_score,
  manipulation_scores,
  consistency,
  overall_manipulation_score,
  image_risk,
  claimId,
  title,
}: {
  ai_score: number;
  manipulation_scores: { view_1: number; view_2: number; view_3: number };
  consistency: number;
  overall_manipulation_score: number;
  image_risk: unknown | null;
  claimId: string;
  title?: string;
}) {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const aiPercent = ai_score * 100;
  // Continuous green (safe) -> yellow (warning) -> red (danger)
  const colorForPercent = (percent: number) =>
    `hsl(${120 - (120 * percent) / 100} 90% 45%)`;
  const aiColor = colorForPercent(aiPercent);
  const consistencyPercent = consistency * 100;
  const consistencyColor = colorForPercent(consistencyPercent);
  const overallPercent = overall_manipulation_score * 100;
  const overallColor = colorForPercent(overallPercent);

  if (image_risk == null) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @4xl/main:grid-cols-2 ">
        <Card className="@container/card">
          <CardHeader>
            <div className="inline-flex items-center justify-center rounded-full bg-muted/40 text-muted-foreground size-10">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <CardTitle className="text-lg font-semibold @[250px]/card:text-xl">
              No analysis yet
            </CardTitle>
            <CardDescription>
              This claim has no analysis data. Run Analyze to generate results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="default"
              size="lg"
              onClick={async () => {
                try {
                  setIsAnalyzing(true);
                  const result = await getClaimScoreById(claimId);
                  if (
                    result &&
                    typeof result === "object" &&
                    "success" in result
                  ) {
                    if (!result.success) {
                      toast.error(
                        result.message ||
                          `Analyze failed${title ? ` for claim ${title}` : ""}`
                      );
                      return;
                    }
                  }
                  toast.success(`Claim ${title ?? ""} analysis complete`);
                  router.refresh();
                } catch {
                  toast.error(
                    `Analyze failed${title ? ` for claim ${title}` : ""}`
                  );
                } finally {
                  setIsAnalyzing(false);
                }
              }}
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @4xl/main:grid-cols-2 ">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold @[250px]/card:text-xl">
            Analysis Results
          </CardTitle>
          <CardDescription>
            This is the analysis results for the claim.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">
              AI Score{" "}
              <span className="font-extrabold">{ai_score * 100} %</span>
            </p>
            <Progress
              value={aiPercent}
              className="max-w-md"
              indicatorStyle={{ backgroundColor: aiColor }}
            />
            <p className="text-sm text-muted-foreground">
              The AI score is a measure of the confidence in the analysis
              results.
            </p>
          </div>
        </CardContent>
      </Card>
      {Object.values(manipulation_scores).length > 1 && (
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold @[250px]/card:text-xl">
              Multi-view Manipulation Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {Object.values(manipulation_scores).map((score, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <p className="text-sm shrink-0">View {index + 1}</p>
                  <Progress
                    value={score * 100}
                    className="flex-1 w-auto min-w-[120px]"
                    indicatorStyle={{
                      backgroundColor: colorForPercent(score * 100),
                    }}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                    {score * 100} %
                  </span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <p className="text-sm shrink-0">Consistency</p>
                  <Progress
                    value={consistencyPercent}
                    className="flex-1 w-auto min-w-[120px]"
                    indicatorStyle={{ backgroundColor: consistencyColor }}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                    {consistencyPercent} %
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm shrink-0">Overall Manipulation Score</p>
                  <Progress
                    value={overallPercent}
                    className="flex-1 w-auto min-w-[120px]"
                    indicatorStyle={{ backgroundColor: overallColor }}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                    {overallPercent} %
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
