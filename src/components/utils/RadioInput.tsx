import Icon from '@/components/utils/Icon';

export function RadioInput({
  label,
  text,
  group,
  icon,
  value,
  pickMe,
}: {
  label: string;
  text: string;
  group: string;
  icon: string;
  value: string | undefined;
  pickMe: (s: string) => void;
}) {
  return (
    <div className="flex gap-4 cursor-pointer ">
      <input
        type="radio"
        name={group}
        className="mt-3 checked:bg-purpleDark focus:text-purpleDark hover:text-purpleDark border-0"
        id={label}
        onChange={(e) => {
          pickMe(label);
        }}
        checked={label === value}
      />
      <label htmlFor={label} className="cursor-pointer">
        <div className="flex gap-2 items-center">
          <Icon icon={icon} />
          <span className="text-lg text-white">{label}</span>
        </div>
        <p className="font-medium text-sm text-disabled">{text}</p>
      </label>
    </div>
  );
}
