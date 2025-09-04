import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ClaimsDetailNarrative({ narrative }: { narrative: string }) {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium leading-none">Narrative</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">{narrative}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
