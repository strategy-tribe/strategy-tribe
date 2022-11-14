import Icon, { IconSize } from '@/components/utils/Icon';

export function FilterSelector<T extends { label: string }>({
  options,
  onSelect,
  selected,
}: {
  options: T[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (option: T | undefined) => void;
  selected: string[] | string | undefined;
}) {
  function isSelected(opt: T) {
    if (typeof selected === 'string') {
      return selected === opt.label;
    } else {
      return !!selected?.find((s) => s === opt.label);
    }
  }

  return (
    <ul className="space-y-6">
      {options.map((option) => {
        return (
          <li key={option.label} className="hover:text-main-light">
            <button
              onClick={() => onSelect(option)}
              className="flex w-full items-center justify-between gap-2"
            >
              <span className="body capitalize">{option.label}</span>
              {isSelected(option) && (
                <Icon icon="close" size={IconSize.Small} />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
