import { useState, useEffect } from 'react';

function getWindowDimensions() {
  try {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  } catch (error) {
    return {
      width: 0,
      height: 0,
    };
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
