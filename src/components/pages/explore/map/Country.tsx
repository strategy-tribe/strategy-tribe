import { DARKEST } from '@/lib/models/map/mapColors';

export function Country({
  color = DARKEST,
  path,
  label,
}: {
  label: string;
  color?: string;
  path: string;
}) {
  return (
    <g className="group country">
      <path d={path} fill={color} id={makeId(label)} />
    </g>
  );
}

function makeId(id: string) {
  if (id === "Côted'Ivoire") return 'cotedivoire';
  else return id.replace(/\s/g, '');
}
