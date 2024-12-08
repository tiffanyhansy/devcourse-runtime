export default function HowTimeTop({
  howTimeHoursSet,
}: {
  howTimeHoursSet: string;
}) {
  return (
    <article className="flex gap-[10px] text-[2.5rem] font-bold">
      <span>총</span>
      <span>{howTimeHoursSet}</span>
      <span>시간!!</span>
    </article>
  );
}
