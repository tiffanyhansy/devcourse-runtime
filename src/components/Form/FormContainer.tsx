export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-[520px] px-[68px] border border-neutral-100 shadow-md rounded-[10px]">
        {children}
      </form>
    </div>
  );
}
