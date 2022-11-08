import { useEffect, useState } from 'react';

import Icon from './Icon';
import { Overlay } from './Overlay';

export interface HasLabel {
  label: string;
}

export function MenuItem<T extends HasLabel>({
  onClick,
  opt,
}: {
  opt: T;
  onClick: (s: T) => void;
}) {
  return (
    <button
      className="label w-full min-w-fit whitespace-nowrap bg-surface-dark py-3 pl-4 pr-8 text-left first-letter:capitalize hover:bg-main hover:text-on-color"
      onClick={() => onClick(opt)}
    >
      {opt.label}
    </button>
  );
}

export function Menu<T extends HasLabel>({
  menuItems,
  select,
}: {
  menuItems: T[];
  select: (s: T) => void;
}) {
  return (
    <div className="elevation-1 absolute z-50 overflow-hidden rounded">
      {menuItems.map((opt) => {
        return <MenuItem key={opt.label} onClick={select} opt={opt} />;
      })}
    </div>
  );
}

export default function Dropdown<T extends HasLabel>({
  options,
  defaultOptionIndex = 0,
  onSelect,
  labelClass = 'title',
  className = '',
}: {
  onSelect?: (s: T) => void;
  options: T[];
  defaultOptionIndex?: number;
  labelClass?: string;
  className?: string;
}) {
  function select(newSelection: T) {
    setSelected(newSelection);
    if (onSelect) onSelect(newSelection);
    setOpen(false);
  }

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options.at(defaultOptionIndex));

  useEffect(() => {
    setSelected(options.at(defaultOptionIndex));
    // eslint-disable-next-line
  }, [defaultOptionIndex]);

  return (
    <>
      <div className={`relative ${open ? 'z-50' : ''} ${className}`}>
        <button
          className={`group flex items-center gap-2 ${labelClass}`}
          onClick={() => setOpen(!open)}
        >
          <p
            className={`label first-letter:capitalize ${
              !open && 'group-hover:text-primary'
            }`}
          >
            {selected?.label}
          </p>
          <Icon icon="arrow_drop_down" />
        </button>

        {open && <Menu menuItems={options} select={select} />}
      </div>

      <Overlay hide={() => setOpen(false)} showOverlay={open} />
    </>
  );
}
