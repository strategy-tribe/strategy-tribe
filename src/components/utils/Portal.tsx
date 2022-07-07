import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function Portal({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector: string;
}) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
