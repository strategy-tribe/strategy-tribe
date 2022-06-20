import Icon from '@/components/utils/Icon';

export function Searchbar({
  search,
  setSearch,
  className,
}: {
  className?: string;
  search: string;
  setSearch: (s: string) => void;
}) {
  return (
    <div
      className={`border-b-2 border-dark flex gap-4 items-center ${className}`}
    >
      <Icon icon="search" />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-black text-white placeholder:text-unactive border-0 focus:border-0 focus:ring-0 w-full"
      />
    </div>
  );
}
