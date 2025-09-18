import { Cards } from "@/components/dashboard/panel/cards";
import Charts from "@/components/dashboard/panel/charts";

export default function Page() {
  return <>
    <div className="flex flex-col gap-4">
      <Cards />
      <Charts />
    </div>
  </>
}
