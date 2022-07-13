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
      <a
        className="px-6 py-4 w-full text-left hover:bg-dark whitespace-nowrap"
        onClick={onClick}
      >
        {label}
      </a>
    </Link>
  );
}
