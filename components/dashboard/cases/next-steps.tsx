import { Button } from "@/components/ui/button";

const nextSteps = [
  {step: "Assign case CLM-10234 to investigator Xiao"},
  {step: "Assign case CLM-10236 to investigator Daming"},
  {step: "Review recent high-risk claims flagged in the system"},
  {step: "Cross-check claim history with similar cases."},
  {step: "Reach out to the claimant for additional details if necessary."},
]

export function NextSteps() {
  return (
    <div>
      <div className="h-66 overflow-y-auto rounded-lg border border-gray-300 bg-gray-10 p-4 shadow-sm">
        <ol className="space-y-1">
          {nextSteps.map((item, index) => (
            <li key={index} className="flex items-center">
              <span>{index + 1}. {item.step}</span>
              <div className="ml-auto flex gap-1">
                <Button
                  className="bg-green-100 text-green-800 text-xs"
                  size="xs"
                  variant="outline"
                >
                  Accept
                </Button>
                <Button
                  className="bg-yellow-100 text-yellow-800 text-xs"
                  size="xs"
                  variant="outline"
                >
                  Ignore
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
