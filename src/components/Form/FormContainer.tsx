export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className=" px-[52px] border border-neutral-100 shadow-md rounded-[10px]">
        {children}
      </form>
    </div>
  );
}
