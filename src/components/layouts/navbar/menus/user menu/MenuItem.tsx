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
    <Link
      href={url}
      className="h-full w-full py-4 pl-8 pr-4 text-right hover:bg-surface"
    >
      <span className="w-full whitespace-nowrap" onClick={onClick}>
        {label}
      </span>
    </Link>
  );
}
