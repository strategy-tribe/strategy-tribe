import Icon, { IconSize } from '@/components/utils/Icon';
import { useState } from 'react';

export function Searchbar({
  searchTerm,
  search,
  className = 'w-full',
  events,
}: {
  className?: string;
  searchTerm: string;
  search: (s: string) => void;
  events?: {
    onBlur?: () => void;
  };
}) {
  const colors = 'bg-black text-white placeholder:text-unactive';
  const borders = 'border-0 focus:border-0 focus:ring-0 ';
  const font = 'body-sm';

  const [input, setInput] = useState(searchTerm);

  function manageEnter() {
    search(input);
    setInput('');
  }

  return (
    <div
      className={`border-b-2 border-dark flex gap-4 items-center ${className}`}
      onBlur={() => {
        if (events?.onBlur) events.onBlur();
      }}
    >
      <Icon icon="search" />
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && !!input) {
            manageEnter();
          }
        }}
        className={`${colors} ${borders} ${font} w-full`}
      />
    </div>
  );
}
