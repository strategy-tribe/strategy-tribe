import { ButtonInformation } from '../utils/Button';

export interface SearchbarInformation {
  text: string;
  setText: (s: string) => void;
}

export interface iNavbar {
  useMobileNavigation?: boolean;
  useNavigation?: boolean;
  useBackArrow?: boolean;
  useBackArrowOnDesktop?: boolean;
  goBack?: () => void;
  leftLabel?: string;
  rightButtonInfo?: ButtonInformation[];
  useOverflowMenu?: boolean;
  background?: boolean;
  //redo later
  forceHide?: boolean;
  setForceHide?: (s: boolean) => void;
}
