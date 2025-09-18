import { Cards } from "@/components/dashboard/cases/cards";

export default function Page() {
  return <>
    <div className="hidden h-full flex-1 flex-col gap-2 px-8 md:flex">
      <Cards />
    </div>
  </>
}
