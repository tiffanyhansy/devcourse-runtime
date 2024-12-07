import Pin from "./Pin";

export default function ToDo() {
  const length = new Array(10).fill(0);
  return (
    <article className="inline-block ToDo-shadow rounded-2xl relative">
      <article className="flex gap-[16px] px-[12px] pt-[10px] pb-[14px] bg-white rounded-t-2xl">
        {length.map((_, i) => (
          <Pin key={i} />
        ))}
      </article>
      <article className="w-full h-[500px] bg-white overflow-y-scroll"></article>
      <article className="w-full h-[30px] bg-white rounded-b-2xl"></article>
      <article className="w-[95%] h-[100px] bg-white absolute translate-x-[-50%] left-[50%] bottom-[-6px] z-[-1] rounded-b-xl ToDo-shadow"></article>
      <article className="w-[90%] h-[100px] bg-white absolute translate-x-[-50%] left-[50%] bottom-[-12px] z-[-2] rounded-b-xl ToDo-shadow"></article>
      <article className="w-[85%] h-[100px] bg-white absolute translate-x-[-50%] left-[50%] bottom-[-18px] z-[-3] rounded-b-xl ToDo-shadow"></article>
    </article>
  );
}
