export function Country({
  color = 'fill-purpleDark',
  path,
}: {
  color?: string;
  path: string;
}) {
  return (
    <g className="group">
      <path d={path} className={color} />
    </g>
  );
}
