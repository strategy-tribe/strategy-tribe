import { useEffect, useRef } from 'react';

export default function useScrollPosition(
  minPosition: number,
  whenBelow?: () => void,
  whenAbove?: () => void
): React.MutableRefObject<number | undefined> {
  const currPosition = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      currPosition.current = window.scrollY;
      if (currPosition.current >= minPosition) {
        whenBelow && whenBelow();
      } else whenAbove && whenAbove();
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [minPosition, whenAbove, whenBelow]);
  return currPosition;
}
