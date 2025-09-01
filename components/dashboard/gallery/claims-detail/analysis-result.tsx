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

export function ClaimsDetailAnalysisResult({
  ai_score,
  manipulation_scores,
}: {
  ai_score: number;
  manipulation_scores: { view_1: number; view_2: number; view_3: number };
}) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 ">
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
            <Progress value={ai_score * 100} className="max-w-md" />
            <p className="text-sm text-muted-foreground">
              The AI score is a measure of the confidence in the analysis
              results.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold @[250px]/card:text-xl">
            Multi-view Manipulation Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {Object.entries(manipulation_scores).map(([view, score]) => (
              <div className="flex items-center gap-3" key={view}>
                <p className="text-sm shrink-0">{view}</p>
                <Progress
                  value={score * 100}
                  className="flex-1 w-auto min-w-[120px]"
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                  {score * 100} %
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
