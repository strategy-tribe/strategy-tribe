//Value must be able to be converted to a string
//Options object must have keys that are strings -> these will be used as the labels

export function ScrollableTabs<
  Value extends { toString: () => string },
  Options extends { [label: string]: Value }
>({
  options,
  setView,
  isActive: isActive,
}: {
  options: Options;
  setView: (newView: Value) => void;
  isActive: (currrent: Value) => boolean;
}) {
  return (
    <nav className="flex items-start gap-6 ">
      {Object.entries(options).map((pair, i) => {
        let label = pair[0];
        const value = pair[1];

        const index = Object.entries(options).findIndex((e) => isActive(e[1]));

        if (value.toString() === 'Individual') {
          label = 'Bounties';
        }

        return (
          <button
            onClick={() => setView(value)}
            key={value.toString()}
            className={`label-lg ${
              isActive(value) ? 'text-text' : 'text-unactive hover:text-text'
            }`}
          >
            {label}
            <div
              className={`pt-1.5 w-1/2 border-b-[3px] border-purpleDark transition-all ease-out ${
                Math.abs(index - i) > 1 ? 'duration-75' : 'duration-300'
              }  ${
                isActive(value)
                  ? ''
                  : `opacity-0 ${
                      i < index ? 'translate-x-[200%]' : '-translate-x-[200%]'
                    }`
              }`}
            ></div>
          </button>
        );
      })}
    </nav>
  );
}
