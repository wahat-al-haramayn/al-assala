import Nav from "@/components/nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 min-h-[20rem] min-w-[22rem] w-full items-center">
      <div className="flex justify-center items-center">
        <Nav />
      </div>

      <div className="flex flex-col gap-20 max-w-2xl p-5 w-full">
        {children}
      </div>
    </div>
  );
}
