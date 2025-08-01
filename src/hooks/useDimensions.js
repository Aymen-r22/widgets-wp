"use client";

import { useEffect } from 'react';
import { create } from '../lib/store';

// Create dimensions store
const useDimensionsStore = create((set, get) => ({
  vw: typeof window !== 'undefined' ? window.innerWidth : 1920,
  vh: typeof window !== 'undefined' ? window.innerHeight : 1080,
  
  // Update dimensions
  updateDimensions: () => {
    if (typeof window !== 'undefined') {
      set({
        vw: window.innerWidth,
        vh: window.innerHeight
      });
    }
  },
  
  // Get breakpoint info
  getBreakpoint: () => {
    const { vw } = get();
    if (vw >= 1024) return 'desktop';
    if (vw > 480) return 'tablet';
    return 'mobile';
  },
  
  // Check if mobile
  isMobile: () => get().vw <= 480,
  
  // Check if tablet
  isTablet: () => {
    const { vw } = get();
    return vw > 480 && vw <= 1024;
  },
  
  // Check if desktop
  isDesktop: () => get().vw >= 1024
}));

// Custom hook for dimensions
export const useDimensions = () => {
  const store = useDimensionsStore();
  
  useEffect(() => {
    // Update dimensions on mount
    store.updateDimensions();
    
    // Set up resize listener
    const handleResize = () => {
      store.updateDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [store]);
  
  return {
    vw: store.vw,
    vh: store.vh,
    breakpoint: store.getBreakpoint(),
    isMobile: store.isMobile(),
    isTablet: store.isTablet(),
    isDesktop: store.isDesktop(),
    updateDimensions: store.updateDimensions
  };
};

// Export the store for direct access (for compatibility)
export const dimensionsStore = {
  getState: useDimensionsStore.getState,
  setState: useDimensionsStore.setState,
  subscribe: (callback) => {
    // This is a simplified subscription for compatibility
    // The actual subscription is handled by the store internally
    return () => {};
  }
};

export default useDimensions;