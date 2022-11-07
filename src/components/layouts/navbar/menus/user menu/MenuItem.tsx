import Link from 'next/link';

export function MenuItem({
  url,
  label,
  onClick,
}: {
  url: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link href={url} className="w-full h-full pl-8 pr-4 py-4 hover:bg-surface text-right">
      <span
        className="w-full whitespace-nowrap"
        onClick={onClick}
      >
        {label}
      </span>
    </Link>
  );
}
