import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "page": *[_type == "lifePage"][0],
  "features": *[_type == "lifeFeature"] | order(order asc),
  "facilities": *[_type == "lifeFacility"] | order(order asc),
  "voices": *[_type == "lifeVoice"] | order(order asc)
}`;

export function useLifeData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(QUERY)
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
