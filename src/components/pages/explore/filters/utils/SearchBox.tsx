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

import { SearchResult, SearchResultType } from './types';
import { useSearchFilter } from './useSearchFilter';

function GetResultIcon(type: SearchResultType) {
  switch (type) {
    case SearchResultType.Country:
      return 'place';
    case SearchResultType.Organization:
      return 'corporate_fare';
    case SearchResultType.Person:
      return 'person';
    case SearchResultType.Tag:
      return 'label';
    default:
      throw new Error('Undefined result type');
  }
}

function compareResults(a: SearchResult, b: SearchResult) {
  return a.name === b.name && a.type === b.type;
}
export function FilterSearchBox({
  selectedResults,
  setSelected,
  remove,
}: {
  selectedResults: SearchResult[];
  setSelected: (_: SearchResult[]) => void;
  // eslint-disable-next-line no-unused-vars
  remove: (resultName: string) => void;
}) {
  const [query, setQuery] = useState('');
  const { results: data, isLoading } = useSearchFilter(query);

  const filteredResult =
    query === ''
      ? data
      : data.filter(({ name, type }) => {
          const nameMatches = name.toLowerCase().includes(query.toLowerCase());
          const typeMatches = type.toLowerCase().includes(query.toLowerCase());
          return nameMatches || typeMatches;
        });

  function removeResult(name: string) {
    remove(name);
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
            autoComplete="off"
          />
          <ActiveOptions
            open={open}
            removeResult={removeResult}
            results={selectedResults}
          />

          <Combobox.Options
            as="ul"
            inputMode="text"
            className="elevation-5 absolute inset-x-0 top-11 max-h-[20rem] overflow-y-auto rounded bg-surface bg-opacity-50"
          >
            {filteredResult.map((result, i) => (
              <Combobox.Option
                key={`${result.name}_${i}`}
                value={result}
                as="li"
              >
                {({ selected }) => {
                  return (
                    <div
                      className="ui flex items-center justify-between gap-2  bg-opacity-50 p-1 ui-selected:bg-main 
                      ui-selected:text-on-color ui-selected:hover:bg-error-light ui-active:bg-surface ui-active:bg-opacity-100"
                    >
                      <button className="flex w-full cursor-pointer items-center gap-1.5 py-1.5">
                        <Icon
                          size={IconSize.Small}
                          icon={GetResultIcon(result.type)}
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
            {filteredResult.length === 0 && !!query && (
              <Combobox.Option value="Loading..." as="li" disabled={true}>
                <div className="flex items-center justify-between gap-2 p-1 ">
                  <div className="flex w-full cursor-pointer items-center gap-1.5 py-1.5">
                    <Icon
                      size={IconSize.Small}
                      icon={isLoading ? 'sync' : 'delete'}
                      className={`text-on-surface-disabled ${
                        isLoading ? 'animate-spin' : ''
                      }`}
                    />
                    <span className="text-left capitalize line-clamp-1">
                      {isLoading ? 'Looking...' : 'No results'}
                    </span>
                  </div>
                </div>
              </Combobox.Option>
            )}
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
  name,
  type,
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
          icon={GetResultIcon(type)}
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
