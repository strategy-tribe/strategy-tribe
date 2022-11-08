export function Section({
  className,
  children,
  id,
}: {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={`${className} mx-auto max-w-7xl px-2`}>
      {children}
    </section>
  );
}
