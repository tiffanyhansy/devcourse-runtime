export default function Pin() {
  return (
    <>
      <article className="w-6 h-5 bg-[#EAEAEA] block rounded-sm relative ">
        <article className="w-full h-full bg-[#D7D7D7] block rounded-sm absolute top-[-2px] left-0 z-[-1]"></article>
        <article className="w-[4px] h-[32px] bg-[#4E4E4E] rounded-lg absolute left-[6px] bottom-[6px]"></article>
        <article className="w-[4px] h-[32px] bg-[#4E4E4E] rounded-lg absolute right-[6px] bottom-[6px]"></article>
      </article>
    </>
  );
}
