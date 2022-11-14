import Icon, { IconSize } from '@/components/utils/Icon';

export function FilterSelector<T extends { label: string }>({
  options,
  select,
  selected,
  remove,
}: {
  options: T[];
  // eslint-disable-next-line no-unused-vars
  select: (option: T) => void;
  remove: (_: T) => void;
  // removeAll: () => void;
  selected: string[] | string | undefined;
}) {
  function checkIsSelected(opt: T) {
    if (typeof selected === 'string') {
      return selected === opt.label;
    } else {
      return !!selected?.find((s) => s === opt.label);
    }
  }

  return (
    <ul className="space-y-6">
      {options.map((option) => {
        const isSelected = checkIsSelected(option);
        return (
          <li key={option.label} className="hover:text-main-light">
            <button
              onClick={() => (isSelected ? remove(option) : select(option))}
              className="flex w-full items-center justify-between gap-2"
            >
              <span className="body capitalize">{option.label}</span>
              {isSelected && (
                <button
                  onClick={() => remove(option)}
                  className="grid place-items-center"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
