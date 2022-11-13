import { Combobox } from '@headlessui/react';
import { useState } from 'react';

import Icon, { IconSize } from '@/components/utils/Icon';

enum ResultType {
  // eslint-disable-next-line no-unused-vars
  Tag = 'Tag',
  // eslint-disable-next-line no-unused-vars
  Organization = 'Organization',
  // eslint-disable-next-line no-unused-vars
  Person = 'Person',
  // eslint-disable-next-line no-unused-vars
  Country = 'Country',
}

type SearchResult = {
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

  //   const [open, setOpen] = useState(true);

  //   const { x, y, reference, floating, strategy } = useFloating({
  //     open,
  //     onOpenChange: setOpen,
  //   });
  return (
    <Combobox
      value={selectedResults}
      onChange={setSelected}
      by={compareResults}
      multiple
    >
      <Combobox.Input
        name="tags"
        //   displayValue={(result: SearchResult) => result.name}
        displayValue={(results: SearchResult[]) => `${results.length} selected`}
        onChange={(event) => setQuery(event.target.value)}
        className="placeholder:label-lg body w-full border-0 border-b bg-transparent pl-1 focus:border-main focus:ring-0"
        placeholder="Find a tag"
        // ref={reference}
      />

      <Combobox.Options as="ul" inputMode="text" className="">
        {filteredResult.map((result) => (
          <Combobox.Option
            // style={{
            //   position: strategy,
            //   top: y ?? 0,
            //   left: x ?? 0,
            //   width: '10rem',
            //   height: '10rem',
            // }}
            // ref={floating}
            key={result.name}
            value={result}
            as="li"
          >
            {({ active, selected }) => {
              return (
                <div
                  className={`flex items-center justify-between gap-2 rounded p-1 ${
                    active ? 'bg-surface' : ''
                  }`}
                >
                  <button className="flex w-full cursor-pointer items-center gap-1.5 py-1.5 hover:text-main-light">
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
                    <button
                      className="grid place-items-center hover:text-error-light"
                      //   onClick={() => console.log('closed')}
                    >
                      <Icon size={IconSize.Small} icon="close" />
                    </button>
                  )}
                </div>
              );
            }}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
