import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `*[_type == "siteSettings"][0]`;

export function useSiteSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(QUERY)
      .then((result) => {
        if (!cancelled) setSettings(result);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
