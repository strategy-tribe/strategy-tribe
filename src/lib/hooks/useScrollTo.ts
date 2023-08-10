import { useCallback } from 'react';

export function useScrollTo(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  offset = -100,
  smooth = true
) {
  function scroll() {
    if (!ref.current) return;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
  }

  return scroll;
}

export function useScrollToTop() {
  const goToTop = useCallback((offset = -100) => {
    const y = offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  return { goToTop };
}
