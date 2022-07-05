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
    <g className="group country" id={`group-${label}`}>
      <path d={path} fill={DARKEST} id={makeId(label)} />
    </g>
  );
}

function makeId(id: string) {
  return id.replace(/\s/g, '');
}
