import Nav from "@/components/nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 min-h-[20rem] min-w-[22rem] w-full sm:w-auto">
      <div className="flex justify-center items-center">
        <Nav />
      </div>

      {children}
    </div>
  );
}
