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
    <Link href={url} className="w-full h-full">
      <span
        className="py-4 w-full text-right hover:bg-surface whitespace-nowrap pl-8 pr-4"
        onClick={onClick}
      >
        {label}
      </span>
    </Link>
  );
}
