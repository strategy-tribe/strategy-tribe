import Icon, { IconSize } from '@/components/utils/Icon';

export function FilterColumn<T extends { label: string }>({
  options,
  onSelect,
  selected,
}: {
  options: T[];
  onSelect?: (s: T) => void;
  selected: T[] | undefined;
}) {
  return (
    <ul className="space-y-6">
      {options.map((option) => {
        const isSelected = !!selected?.find((s) => s.label === option.label);
        return (
          <li key={option.label} className="hover:text-main-light">
            <button>
              <span className="body capitalize">{option.label}</span>
              {isSelected && <Icon icon="close" size={IconSize.Small} />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
