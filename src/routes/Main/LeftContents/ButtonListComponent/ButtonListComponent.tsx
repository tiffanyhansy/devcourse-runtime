import LinkButton from "./LinkButton";

export default function ButtonListComponent() {
  return (
    <section className="flex gap-[6px]">
      <LinkButton />
      <LinkButton />
      <LinkButton />
      <LinkButton />
    </section>
  );
}
