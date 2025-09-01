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

export function ClaimsDetailAnalysisResult({ ai_score }: { ai_score: number }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
      <Card className="@container/card max-w-lg">
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
            <Progress value={ai_score * 100} className="max-w-md" />
            <p className="text-sm text-muted-foreground">
              The AI score is a measure of the confidence in the analysis
              results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
