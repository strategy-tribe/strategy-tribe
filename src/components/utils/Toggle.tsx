import Switch from 'react-switch';

export default function Toggle({
  value,
  setValue,
  whenOn,
  whenOff,
  usePadding = true,
  size = 'label',
}: {
  size?: string;
  usePadding?: boolean;
  whenOn: string;
  whenOff: string;
  value: boolean;
  setValue: (s: boolean) => void;
}) {
  return (
    <div className={`flex items-center ${usePadding && 'pt-4'}`}>
      <label htmlFor="required" className={`label-lg min-w-[7rem] ${size}`}>
        {value ? whenOn : whenOff}
      </label>
      <Switch
        onChange={() => {
          setValue(!value);
        }}
        checked={value}
        onColor="#A29BFE"
        onHandleColor="#6C5CE7"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
      />
    </div>
  );
}
