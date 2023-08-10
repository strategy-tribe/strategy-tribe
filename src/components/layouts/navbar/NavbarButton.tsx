import Icon, { IconSize } from '../../utils/Icon';

export function NavbarButton({
  icon,
  onClick,
}: {
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      className="grid place-items-center rounded-full p-1 hover:bg-surface"
      onClick={onClick}
    >
      <Icon icon={icon} size={IconSize.Small} />
    </button>
  );
}
