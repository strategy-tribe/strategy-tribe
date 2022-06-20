import { DARKEST } from '@/lib/models/map/mapColors';

export function Country({
  color = DARKEST,
  path,
}: {
  color?: string;
  path: string;
}) {
  return (
    <g className="group">
      <path d={path} fill={color} />
    </g>
  );
}
