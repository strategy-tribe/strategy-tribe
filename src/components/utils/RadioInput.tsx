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
    <div className="flex cursor-pointer gap-4 ">
      <input
        type="radio"
        name={group}
        className="mt-3 border-0 checked:bg-main hover:text-main focus:text-main"
        id={label}
        onChange={(e) => {
          pickMe(label);
        }}
        checked={label === value}
      />
      <label htmlFor={label} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Icon icon={icon} />
          <span className="text-lg text-on-surface-p0">{label}</span>
        </div>
        <p className="text-sm font-medium text-on-surface-disabled">{text}</p>
      </label>
    </div>
  );
}
