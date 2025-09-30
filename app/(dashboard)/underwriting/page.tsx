export default function Page() {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col gap-8 px-8 md:flex">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Write policies faster, consistent and without bias.
            </p>
            <p className="text-muted-foreground">
              Spot high risks thanks to advanced, real-time analytics and data points.
            </p>
            <p className="text-muted-foreground">
              Honest customers alone enter your book of business.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
