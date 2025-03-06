import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [navigationType, setNavigationType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pageLoadCount = sessionStorage.getItem('pageLoadCount') || '0';
    const lastPath = sessionStorage.getItem('lastPath');
    const currentPath = window.location.pathname;

    if (pageLoadCount === '0') {
      sessionStorage.setItem('pageLoadCount', '1');
      setNavigationType('refresh');
    } else if (document.referrer === '') {
      // No referrer means direct URL entry or external link
      setNavigationType('refresh');
    } else {
      // If paths are different and we have a referrer from same origin, it's an internal navigation. Otherwise, it's a refresh
      const referrerUrl = new URL(document.referrer);
      const isSameOrigin = referrerUrl.origin === window.location.origin;

      setNavigationType(
        lastPath !== currentPath && isSameOrigin ? 'navigation' : 'refresh'
      );
    }

    sessionStorage.setItem('lastPath', currentPath);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setNavigationType('navigation');
      sessionStorage.setItem('lastPath', url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <NavigationContext.Provider value={navigationType}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
