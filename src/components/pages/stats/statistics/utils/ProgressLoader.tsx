export default function ProgressLoader({ style }: { style: string }) {
  return (
    <div className="flex w-full items-center">
      <section
        className="h-1.5 rounded bg-dark-purple"
        style={{ ['width' as any]: `${style}%` }}
      ></section>
    </div>
  );
}
