export function HugeTitle({
  title,
  size = 'text-5xl',
}: {
  title: string;
  size?: string;
}) {
  return (
    <div className="space-y-6">
      <h2 className={`text-white ${size} font-inter font-bold`}>{title}</h2>
      <span
        className={`bg-purpleDark h-2 inline-block -translate-y-2 w-32`}
      ></span>
    </div>
  );
}
