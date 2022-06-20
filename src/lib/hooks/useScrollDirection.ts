import { useEffect, useRef } from 'react';

export function useScrollDirection(
  whenMovingUp: () => void,
  whenMovingDown: () => void,
  minPosition: number = 0
) {
  const lastPosition = useRef<number>(0);
  const newPosition = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      newPosition.current = window.pageYOffset;
      if (newPosition.current > minPosition) {
        if (newPosition.current >= lastPosition.current) {
          whenMovingDown();
        } else {
          whenMovingUp();
        }

        lastPosition.current = newPosition.current;
      } else {
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [whenMovingDown, whenMovingUp]);

  return newPosition;
}
