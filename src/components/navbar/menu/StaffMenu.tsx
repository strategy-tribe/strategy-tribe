import { ButtonInformation } from '@/components/utils/Button';
import { Menu } from './Menu';

export function StaffMenu({
  show,
  hide,
  extraButtons,
}: {
  show: boolean;
  hide: () => void;
  extraButtons?: ButtonInformation[];
}) {
  return <Menu hide={hide} show={show} extraButtons={extraButtons} />;
}
