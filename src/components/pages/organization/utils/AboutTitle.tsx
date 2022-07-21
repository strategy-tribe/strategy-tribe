export function AboutTitle({ text }: { text: string }) {
  return (
    <div className="pb-2">
      <h2 className="title-xs text-unactive">{text}</h2>
    </div>
  );
}
