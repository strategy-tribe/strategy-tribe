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
    <section id={id} className={`${className} px-2 mx-auto max-w-7xl`}>
      {children}
    </section>
  );
}
