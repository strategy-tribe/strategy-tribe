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
    <Link href={url} className="h-full w-full">
      <span
        className="w-full whitespace-nowrap py-4 pl-8 pr-4 text-right hover:bg-surface"
        onClick={onClick}
      >
        {label}
      </span>
    </Link>
  );
}
