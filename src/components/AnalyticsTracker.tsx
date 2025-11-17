import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views only in production
    if (import.meta.env.PROD) {
      // The `pageview` event is sent on route change.
      // We are sending the pathname and search parameters.
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  return null; // This component does not render anything
};

export default AnalyticsTracker;
