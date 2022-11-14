import {
  FloatingPortal,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { Combobox } from '@headlessui/react';
import React, { useState } from 'react';

import Icon, { IconSize } from '@/components/utils/Icon';

export enum ResultType {
  // eslint-disable-next-line no-unused-vars
  Tag = 'Tag',
  // eslint-disable-next-line no-unused-vars
  Organization = 'Organization',
  // eslint-disable-next-line no-unused-vars
  Person = 'Person',
  // eslint-disable-next-line no-unused-vars
  Country = 'Country',
}

export type SearchResult = {
  type: ResultType;
  name: string;
  icon: string;
};

const data: SearchResult[] = [
  { name: 'terrorist', type: ResultType.Tag, icon: 'label' },
  { name: 'armed group', type: ResultType.Tag, icon: 'label' },
  { name: 'byker gang', type: ResultType.Tag, icon: 'label' },
  { name: 'hacker group', type: ResultType.Tag, icon: 'label' },
  { name: 'media wing', type: ResultType.Tag, icon: 'label' },
  { name: 'disinformation', type: ResultType.Tag, icon: 'label' },
  { name: 'propaganda', type: ResultType.Tag, icon: 'label' },
  {
    name: '313 brigade',
    type: ResultType.Organization,
    icon: 'corporate_fare',
  },
  {
    name: 'zarya battalion',
    type: ResultType.Organization,
    icon: 'corporate_fare',
  },
  {
    name: 'the night wolves',
    type: ResultType.Organization,
    icon: 'corporate_fare',
  },
  {
    name: 'ural bank for reconstruction and development',
    type: ResultType.Organization,
    icon: 'corporate_fare',
  },
  {
    name: 'strategic culture foundation',
    type: ResultType.Organization,
    icon: 'corporate_fare',
  },
  { name: 'david davidovich', type: ResultType.Person, icon: 'person' },
  {
    name: 'boris yakovlevich rapoport',
    type: ResultType.Person,
    icon: 'person',
  },
  {
    name: 'vitaly gennadyevich savelyev',
    type: ResultType.Person,
    icon: 'person',
  },
  {
    name: 'igor nikoolaevich turchenyuk',
    type: ResultType.Person,
    icon: 'person',
  },
  { name: 'Russia', type: ResultType.Country, icon: 'place' },
  { name: 'China', type: ResultType.Country, icon: 'place' },
  { name: 'USA', type: ResultType.Country, icon: 'place' },
  { name: 'Bolivia', type: ResultType.Country, icon: 'place' },
  { name: 'Palestine', type: ResultType.Country, icon: 'place' },
];

function compareResults(a: SearchResult, b: SearchResult) {
  return a.name === b.name && a.type === b.type;
}
export function FilterSearchBox() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [selectedResults, setSelected] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');

  const filteredResult =
    query === ''
      ? data
      : data.filter(({ name, type, icon }) => {
          const nameMatches = name.toLowerCase().includes(query.toLowerCase());
          const typeMatches = type.toLowerCase().includes(query.toLowerCase());
          const iconMatches = icon.toLowerCase().includes(query.toLowerCase());
          return nameMatches || typeMatches || iconMatches;
        });

  function removeResult(name: string) {
    setSelected((p) => p.filter((result) => result.name !== name));
  }

  return (
    <Combobox
      value={selectedResults}
      onChange={setSelected}
      by={compareResults}
      multiple
      as="div"
      className="relative"
    >
      {({ open }) => (
        <React.Fragment>
          <Combobox.Input
            name="tags"
            onChange={(event) => setQuery(event.target.value)}
            className="placeholder:label-lg body w-full border-0 border-b bg-transparent pl-1 focus:border-main focus:ring-0"
            placeholder="Find a tag"
          />
          <ActiveOptions
            open={open}
            removeResult={removeResult}
            results={selectedResults}
          />

          <Combobox.Options
            as="ul"
            inputMode="text"
            className="elevation-5 absolute inset-x-0 top-11 max-h-[20rem] overflow-y-auto rounded bg-surface"
          >
            {filteredResult.map((result) => (
              <Combobox.Option key={result.name} value={result} as="li">
                {({ selected }) => {
                  return (
                    <div className="flex items-center justify-between gap-2 p-1  ui-selected:bg-main ui-selected:text-on-color ui-selected:hover:bg-error-light ui-active:bg-surface-dark ui-active:bg-opacity-50">
                      <button className="flex w-full cursor-pointer items-center gap-1.5 py-1.5">
                        <Icon
                          size={IconSize.Small}
                          icon={result.icon}
                          className=" text-on-surface-disabled"
                        />
                        <span className="text-left capitalize line-clamp-1">
                          {result.name}
                        </span>
                      </button>

                      {selected && (
                        <button className="grid place-items-center hover:text-error-light">
                          <Icon size={IconSize.Small} icon="close" />
                        </button>
                      )}
                    </div>
                  );
                }}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </React.Fragment>
      )}
    </Combobox>
  );
}

/** Renders a list of results  */
function ActiveOptions({
  results,
  open,
  removeResult,
}: {
  results: SearchResult[];
  open: boolean;
  removeResult: (s: string) => void;
}) {
  return (
    <ul
      className={`block h-[20rem] translate-y-4 overflow-y-auto ${
        open ? 'opacity-50 blur-[2px]' : ''
      }`}
    >
      {results.map((r, i) => {
        return (
          <ActiveOption {...r} key={i} onClick={() => removeResult(r.name)} />
        );
      })}
    </ul>
  );
}

/** Renders a result */
function ActiveOption({
  icon,
  name,
  onClick,
}: SearchResult & { onClick: () => void }) {
  const [open, setOpen] = useState(false);
  const { context, reference, floating, strategy, x, y } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-end',
  });

  const hover = useHover(context, {
    delay: {
      close: 0,
      open: 500,
    },
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    role,
    dismiss,
    focus,
  ]);

  return (
    <>
      <button
        ref={reference}
        {...getReferenceProps({
          onClick,
          className:
            'flex w-full cursor-pointer items-center gap-1.5 py-1.5 hover:text-error-light',
        })}
      >
        <Icon
          size={IconSize.Small}
          icon={icon}
          className=" text-on-surface-disabled"
        />
        <span className="text-left capitalize line-clamp-1">{name}</span>
      </button>
      <FloatingPortal>
        {open && (
          <div
            ref={floating}
            style={{
              position: strategy,
              left: x ?? 0,
              top: y ?? 0,
              width: 'max-content',
            }}
            {...getFloatingProps({
              className:
                'body elevation-1 rounded border border-surface-dark bg-surface py-2.5 pl-3 pr-5 text-left',
            })}
          >
            Click to remove
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
