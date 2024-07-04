import { useState, useEffect } from 'react';

const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const detectViewportHeight = () => {
      // Use window.innerHeight for a more accurate viewport height
      setViewportHeight(window.innerHeight);
    };

    // Detect height on mount
    detectViewportHeight();

    // Optional: Re-detect on orientation change for mobile devices
    window.addEventListener('orientationchange', detectViewportHeight);

    return () => {
      window.removeEventListener('orientationchange', detectViewportHeight);
    };
  }, []);

  return viewportHeight;
};