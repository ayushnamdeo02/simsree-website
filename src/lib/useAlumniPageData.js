import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "alumniPage": *[_type == "alumniPage"][0],
  "hallOfFame": *[_type == "hallOfFameEntry"] | order(order asc),
  "profiles": *[_type == "alumniProfile"] | order(order asc),
  "employers": *[_type == "alumniEmployer"] | order(order asc),
  "voices": *[_type == "studentVoice"] | order(order asc)
}`;

export function useAlumniPageData() {
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
